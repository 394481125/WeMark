import React from 'react';
import { Copy, Image as ImageIcon, Layout, Code as CodeIcon, Monitor, FileText, Type, Minus, Plus, ArrowUpDown, ImagePlus, Heading, MoveVertical, scaling, Scaling } from 'lucide-react';
import { ArticleTheme, CodeTheme } from '../types';

interface ToolbarProps {
  currentTheme: ArticleTheme;
  setTheme: (t: ArticleTheme) => void;
  currentCodeTheme: CodeTheme;
  setCodeTheme: (t: CodeTheme) => void;
  isMacStyle: boolean;
  setIsMacStyle: (v: boolean) => void;
  fontSize: number;
  setFontSize: (s: number) => void;
  paragraphSpacing: number;
  setParagraphSpacing: (s: number) => void;
  headerSpacing: number;
  setHeaderSpacing: (s: number) => void;
  lineHeight: number;
  setLineHeight: (s: number) => void;
  letterSpacing: number;
  setLetterSpacing: (s: number) => void;
  onCopy: () => void;
  copyState: 'idle' | 'success' | 'error';
  onExportImage: () => void;
  onExportPdf: () => void;
  isExporting: boolean;
  onInsertImage: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTheme,
  setTheme,
  currentCodeTheme,
  setCodeTheme,
  isMacStyle,
  setIsMacStyle,
  fontSize,
  setFontSize,
  paragraphSpacing,
  setParagraphSpacing,
  headerSpacing,
  setHeaderSpacing,
  lineHeight,
  setLineHeight,
  letterSpacing,
  setLetterSpacing,
  onCopy,
  copyState,
  onExportImage,
  onExportPdf,
  isExporting,
  onInsertImage
}) => {
  
  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta));
    setFontSize(newSize);
  };

  const adjustSpacing = (delta: number) => {
    const newSpacing = Math.max(0, Math.min(60, paragraphSpacing + delta));
    setParagraphSpacing(newSpacing);
  };

  const adjustHeaderSpacing = (delta: number) => {
    const newSpacing = Math.max(5, Math.min(80, headerSpacing + delta));
    setHeaderSpacing(newSpacing);
  };

  const adjustLineHeight = (delta: number) => {
    const newVal = Math.max(1.0, Math.min(3.0, parseFloat((lineHeight + delta).toFixed(1))));
    setLineHeight(newVal);
  };

  const adjustLetterSpacing = (delta: number) => {
    const newVal = Math.max(0, Math.min(0.5, parseFloat((letterSpacing + delta).toFixed(2))));
    setLetterSpacing(newVal);
  };

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-bold text-xl tracking-tight text-gray-800">WeMark</span>
            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full">Plus</span>
        </div>

        <div className="h-6 w-px bg-gray-200 flex-shrink-0"></div>

        {/* Article Theme Selector */}
        <div className="flex items-center gap-2 flex-shrink-0">
            <Layout size={16} className="text-gray-500" />
            <select 
                value={currentTheme}
                onChange={(e) => setTheme(e.target.value as ArticleTheme)}
                className="text-sm border-none bg-transparent font-medium text-gray-700 focus:ring-0 cursor-pointer hover:text-blue-600 transition-colors max-w-[140px]"
            >
                <optgroup label="Mainstream">
                    <option value="default">Default (WeChat)</option>
                    <option value="zhihu">Zhihu Blue</option>
                    <option value="medium">Medium Serif</option>
                    <option value="toutiao">News</option>
                </optgroup>
                <optgroup label="Aesthetic">
                    <option value="sakura">Sakura Pink</option>
                    <option value="antique">Antique Paper</option>
                    <option value="cyber">Cyber Purple</option>
                    <option value="gold">Gold Luxury</option>
                </optgroup>
                <optgroup label="Colors">
                    <option value="tech">Tech Blue</option>
                    <option value="lapis">Lapis Blue</option>
                    <option value="orange">Vitality Orange</option>
                    <option value="green">Forest Green</option>
                </optgroup>
                <optgroup label="Minimal">
                    <option value="simple">Simple Black</option>
                </optgroup>
            </select>
        </div>

        {/* Code Theme Selector */}
        <div className="flex items-center gap-2 flex-shrink-0">
            <CodeIcon size={16} className="text-gray-500" />
            <select 
                value={currentCodeTheme}
                onChange={(e) => setCodeTheme(e.target.value as CodeTheme)}
                className="text-sm border-none bg-transparent font-medium text-gray-700 focus:ring-0 cursor-pointer hover:text-blue-600 transition-colors"
            >
                <option value="github">GitHub Light</option>
                <option value="vscode">VS Code Dark</option>
                <option value="dracula">Dracula</option>
                <option value="monokai">Monokai</option>
                <option value="atom">Atom One Dark</option>
            </select>
        </div>

        {/* Font Size Control */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 rounded-lg p-1" title="Font Size">
             <button 
                onClick={() => adjustFontSize(-1)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={fontSize <= 12}
             >
                <Minus size={14} />
             </button>
             <div className="flex items-center gap-1.5 px-1 min-w-[3rem] justify-center">
                <Type size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{fontSize}px</span>
             </div>
             <button 
                onClick={() => adjustFontSize(1)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={fontSize >= 24}
             >
                <Plus size={14} />
             </button>
        </div>

        {/* Line Height Control */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 rounded-lg p-1" title="Line Height">
             <button 
                onClick={() => adjustLineHeight(-0.1)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={lineHeight <= 1.0}
             >
                <Minus size={14} />
             </button>
             <div className="flex items-center gap-1.5 px-1 min-w-[3rem] justify-center">
                <MoveVertical size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{lineHeight}</span>
             </div>
             <button 
                onClick={() => adjustLineHeight(0.1)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={lineHeight >= 3.0}
             >
                <Plus size={14} />
             </button>
        </div>

        {/* Letter Spacing Control */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 rounded-lg p-1" title="Letter Spacing">
             <button 
                onClick={() => adjustLetterSpacing(-0.05)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={letterSpacing <= 0}
             >
                <Minus size={14} />
             </button>
             <div className="flex items-center gap-1.5 px-1 min-w-[3rem] justify-center">
                <Scaling size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{letterSpacing}</span>
             </div>
             <button 
                onClick={() => adjustLetterSpacing(0.05)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={letterSpacing >= 0.5}
             >
                <Plus size={14} />
             </button>
        </div>

        {/* Paragraph Spacing Control */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 rounded-lg p-1" title="Paragraph Spacing">
             <button 
                onClick={() => adjustSpacing(-4)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={paragraphSpacing <= 0}
             >
                <Minus size={14} />
             </button>
             <div className="flex items-center gap-1.5 px-1 min-w-[3rem] justify-center">
                <ArrowUpDown size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{paragraphSpacing}px</span>
             </div>
             <button 
                onClick={() => adjustSpacing(4)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={paragraphSpacing >= 60}
             >
                <Plus size={14} />
             </button>
        </div>

        {/* Header Spacing Control */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-100 rounded-lg p-1" title="Header Spacing">
             <button 
                onClick={() => adjustHeaderSpacing(-5)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={headerSpacing <= 5}
             >
                <Minus size={14} />
             </button>
             <div className="flex items-center gap-1.5 px-1 min-w-[3rem] justify-center">
                <Heading size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{headerSpacing}px</span>
             </div>
             <button 
                onClick={() => adjustHeaderSpacing(5)}
                className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all disabled:opacity-50"
                disabled={headerSpacing >= 80}
             >
                <Plus size={14} />
             </button>
        </div>

        {/* Insert Image Button */}
        <button 
            onClick={onInsertImage}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
            title="Insert Image"
        >
            <ImagePlus size={16} />
            <span className="hidden sm:inline">Insert</span>
        </button>

        {/* Mac Style Toggle */}
        <button 
            onClick={() => setIsMacStyle(!isMacStyle)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors flex-shrink-0 ${isMacStyle ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
            <Monitor size={16} />
            <span className="hidden sm:inline">Mac Style</span>
        </button>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
        {/* Export Image Button */}
        <button
          onClick={onExportImage}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
          title="Export as Image"
        >
            <ImageIcon size={16} />
            <span className="hidden sm:inline">Image</span>
        </button>

        {/* Export PDF Button */}
        <button
          onClick={onExportPdf}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
          title="Export as PDF"
        >
            <FileText size={16} />
            <span className="hidden sm:inline">PDF</span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <button 
            onClick={onCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                copyState === 'success' 
                ? 'bg-green-500 text-white shadow-green-200' 
                : 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-gray-200'
            }`}
        >
            <Copy size={16} />
            {copyState === 'success' ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};