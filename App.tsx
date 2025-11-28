import React, { useState, useEffect, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { processMarkdown } from './services/markdownService';
import { AppState, SAMPLE_MARKDOWN } from './types';

const STORAGE_KEY = 'wemark_app_state';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          content: SAMPLE_MARKDOWN,
          articleTheme: 'default',
          codeTheme: 'github',
          isMacStyle: true,
          fontSize: 16,
          paragraphSpacing: 24,
          headerSpacing: 30,
          lineHeight: 1.75,
          letterSpacing: 0,
          ...parsed,
        };
      }
    } catch (e) {
      console.warn('Failed to load state', e);
    }
    return {
      content: SAMPLE_MARKDOWN,
      articleTheme: 'default',
      codeTheme: 'github',
      isMacStyle: true,
      fontSize: 16,
      paragraphSpacing: 24,
      headerSpacing: 30,
      lineHeight: 1.75,
      letterSpacing: 0,
    };
  });

  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const [isExporting, setIsExporting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const cursorTarget = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Restore cursor after content modification (e.g. image insert)
  useEffect(() => {
    if (cursorTarget.current !== null && editorRef.current) {
        editorRef.current.setSelectionRange(cursorTarget.current, cursorTarget.current);
        editorRef.current.focus();
        cursorTarget.current = null;
    }
  }, [state.content]);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      const html = await processMarkdown(
        state.content, 
        state.articleTheme, 
        state.codeTheme, 
        state.isMacStyle,
        state.fontSize || 16,
        state.paragraphSpacing ?? 24,
        state.headerSpacing ?? 30,
        state.lineHeight ?? 1.75,
        state.letterSpacing ?? 0
      );
      if (active) setRenderedHtml(html);
    }, 150);

    return () => {
        clearTimeout(timer);
        active = false;
    };
  }, [
    state.content, 
    state.articleTheme, 
    state.codeTheme, 
    state.isMacStyle, 
    state.fontSize, 
    state.paragraphSpacing, 
    state.headerSpacing,
    state.lineHeight,
    state.letterSpacing
  ]);

  const updateState = (key: keyof AppState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = useCallback(async () => {
    if (!renderedHtml) return;
    try {
      const blob = new Blob([renderedHtml], { type: 'text/html' });
      const textBlob = new Blob([state.content], { type: 'text/plain' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob })];
      await navigator.clipboard.write(data);
      setCopyState('success');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      setCopyState('error');
    }
  }, [renderedHtml, state.content]);

  const captureContent = async (): Promise<HTMLCanvasElement | null> => {
    const element = document.getElementById('preview-render-root');
    if (!element) return null;

    // Slight delay to ensure DOM settle (esp for Mermaid/Math images)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        return await html2canvas(element, {
            useCORS: true,
            scale: 2, 
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: true,
            height: element.scrollHeight,
            windowHeight: element.scrollHeight
        });
    } catch (e) {
        console.error("Capture failed:", e);
        return null;
    }
  };

  const handleExportImage = useCallback(async () => {
    try {
      setIsExporting(true);
      const canvas = await captureContent();
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `wemark-image-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      alert('Failed to generate image.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleExportPdf = useCallback(async () => {
    try {
      setIsExporting(true);
      const canvas = await captureContent();
      if (!canvas) return;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10; 
      
      const printWidth = pdfWidth - (2 * margin);
      const printHeight = pdfHeight - (2 * margin);
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeightInPdf = (imgProps.height * printWidth) / imgProps.width;
      
      let heightLeft = imgHeightInPdf;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', margin, margin + position, printWidth, imgHeightInPdf);
      heightLeft -= printHeight;
      position -= printHeight; // Move up for next page slice

      // Add subsequent pages
      const MAX_PAGES = 50;
      let page = 1;
      
      while (heightLeft > 0 && page < MAX_PAGES) {
        pdf.addPage();
        // We draw the image at a negative Y offset, effectively revealing the next slice
        pdf.addImage(imgData, 'JPEG', margin, margin + position, printWidth, imgHeightInPdf);
        heightLeft -= printHeight;
        position -= printHeight;
        page++;
      }

      pdf.save(`wemark-doc-${Date.now()}.pdf`);

    } catch (err) {
      console.error('PDF Export failed', err);
      alert('Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleInsertImage = () => {
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (!base64) return;

        const markdownImage = `\n![Image](${base64})\n`;
        const textarea = editorRef.current;
        
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = state.content;
            
            const newText = text.substring(0, start) + markdownImage + text.substring(end);
            cursorTarget.current = start + markdownImage.length; // Track cursor
            updateState('content', newText);
        } else {
            updateState('content', state.content + markdownImage);
        }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 text-gray-900 overflow-hidden">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <Toolbar 
        currentTheme={state.articleTheme}
        setTheme={(t) => updateState('articleTheme', t)}
        currentCodeTheme={state.codeTheme}
        setCodeTheme={(t) => updateState('codeTheme', t)}
        isMacStyle={state.isMacStyle}
        setIsMacStyle={(v) => updateState('isMacStyle', v)}
        fontSize={state.fontSize || 16}
        setFontSize={(v) => updateState('fontSize', v)}
        paragraphSpacing={state.paragraphSpacing ?? 24}
        setParagraphSpacing={(v) => updateState('paragraphSpacing', v)}
        headerSpacing={state.headerSpacing ?? 30}
        setHeaderSpacing={(v) => updateState('headerSpacing', v)}
        lineHeight={state.lineHeight ?? 1.75}
        setLineHeight={(v) => updateState('lineHeight', v)}
        letterSpacing={state.letterSpacing ?? 0}
        setLetterSpacing={(v) => updateState('letterSpacing', v)}
        onCopy={handleCopy}
        copyState={copyState}
        onExportImage={handleExportImage}
        onExportPdf={handleExportPdf}
        isExporting={isExporting}
        onInsertImage={handleInsertImage}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200">
          <Editor 
            ref={editorRef}
            value={state.content} 
            onChange={(val) => updateState('content', val)} 
          />
        </div>
        <div className="w-1/2 bg-gray-100">
           <div className="h-full w-full">
             <Preview html={renderedHtml} />
           </div>
        </div>
      </div>
    </div>
  );
}