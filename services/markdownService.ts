import { marked } from 'marked';
import hljs from 'highlight.js';
import mermaid from 'mermaid';
import { ARTICLE_THEMES, CODE_THEMES, MAC_HEADER_STYLE, MAC_DOT_RED, MAC_DOT_YELLOW, MAC_DOT_GREEN } from '../constants';
import { ArticleTheme, CodeTheme } from '../types';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: (code, lang) => {
    // Prevent highlight.js from trying to highlight mermaid or latex code
    if (lang === 'mermaid' || lang === 'latex' || lang === 'math') {
        return code;
    }
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
});

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

// --- Helper Functions ---

/**
 * Temporarily replace code blocks with placeholders to prevent
 * other processors (like MathJax) from modifying code content.
 */
const protectCode = (markdown: string, store: string[]): string => {
  // 1. Block Code: ``` ... ```
  // 2. Inline Code: ` ... `
  // We utilize a callback to store the content and return a placeholder key.
  return markdown.replace(/```[\s\S]*?```|`[^`\n]+`/g, (match) => {
    store.push(match);
    return `__CODE_PLACEHOLDER_${store.length - 1}__`;
  });
};

const restoreCode = (markdown: string, store: string[]): string => {
  return markdown.replace(/__CODE_PLACEHOLDER_(\d+)__/g, (_, index) => {
    return store[Number(index)] || '';
  });
};

/**
 * Convert LaTeX formulas to Images using CodeCogs.
 */
const processMath = (markdown: string): string => {
  // Block Math: $$ ... $$
  markdown = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    const content = formula.trim().replace(/\n/g, ' ');
    if (!content) return match;
    const latex = `\\dpi{300} \\displaystyle ${content}`;
    const encoded = encodeURIComponent(latex);
    // Add a specific class to identifying math images for style overrides
    return `<img class="math-block" src="https://latex.codecogs.com/png.image?${encoded}" alt="${content}" />`;
  });

  // Inline Math: $ ... $
  // Regex Explanation:
  // (?<!\\)\$        : Match $ not preceded by \
  // (?!\s)           : Next char is NOT whitespace (prevents matching "$ 100")
  // ([^$\n]+?)       : Capture content (non-greedy, no newlines, no $)
  // (?<!\s)          : Previous char inside capture was NOT whitespace
  // (?<!\\)\$        : Match closing $
  markdown = markdown.replace(/(?<!\\)\$(?!\s)([^$\n]+?)(?<!\s)(?<!\\)\$/g, (match, formula) => {
    const content = formula.trim();
    if (!content) return match;
    
    // Check if it looks like currency (e.g., $10.50) - basic heuristic
    if (/^\d+(\.\d{1,2})?$/.test(content)) return match;

    const latex = `\\dpi{150} ${content}`;
    const encoded = encodeURIComponent(latex);
    return `<img class="math-inline" src="https://latex.codecogs.com/png.image?${encoded}" alt="${content}" />`;
  });

  return markdown;
};

/**
 * Renders SVG to a PNG Base64 string.
 * Handles resizing to prevent 0x0 issues.
 */
const svgToPngBase64 = (svgStr: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // 1. Clean SVG string to ensure it has size attributes
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgStr, "image/svg+xml");
    const svgElement = doc.documentElement;

    // Determine dimensions
    let width = parseFloat(svgElement.getAttribute('width') || '0');
    let height = parseFloat(svgElement.getAttribute('height') || '0');
    
    // If no explicit size, try viewBox
    if (!width || !height) {
        const viewBox = svgElement.getAttribute('viewBox');
        if (viewBox) {
            const parts = viewBox.split(/\s+|,/).filter(Boolean).map(parseFloat);
            if (parts.length === 4) {
                 width = parts[2];
                 height = parts[3];
            }
        }
    }

    // Fallback defaults
    if (!width) width = 800;
    if (!height) height = 600;

    // Force explicit pixel units on the SVG for the Image() constructor
    svgElement.setAttribute('width', `${width}px`);
    svgElement.setAttribute('height', `${height}px`);
    
    const serializer = new XMLSerializer();
    const cleanSvgStr = serializer.serializeToString(svgElement);

    // Convert to Base64
    const svg64 = btoa(unescape(encodeURIComponent(cleanSvgStr)));
    img.src = `data:image/svg+xml;base64,${svg64}`;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // High resolution scale
      const scale = 2; 
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Optional: Add white background if transparent
        // ctx.fillStyle = '#ffffff';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve('');
      }
    };
    
    img.onerror = (e) => {
        console.error('SVG to PNG conversion failed', e);
        resolve('');
    };
  });
};

/**
 * Main Processing Function
 */
export const processMarkdown = async (
  markdown: string,
  themeName: ArticleTheme,
  codeThemeName: CodeTheme,
  isMacStyle: boolean,
  fontSize: number,
  paragraphSpacing: number,
  headerSpacing: number,
  lineHeight: number,
  letterSpacing: number
): Promise<string> => {
  
  const placeholders: string[] = [];

  // 1. Protect Code
  const protectedMd = protectCode(markdown, placeholders);

  // 2. Process Math (Latex)
  const mathProcessedMd = processMath(protectedMd);

  // 3. Restore Code (so marked can parse it as code blocks)
  const restoredMd = restoreCode(mathProcessedMd, placeholders);

  // 4. HTML Generation
  const rawHtml = await marked.parse(restoredMd);

  // 5. DOM Manipulation Setup
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');
  
  // 6. Mermaid Processing (The Tricky Part)
  const mermaidCodeBlocks = doc.querySelectorAll('code.language-mermaid');
  
  if (mermaidCodeBlocks.length > 0) {
      // Create a staging area in the REAL DOM, not the parsed one.
      // Mermaid needs to be in the document to calculate text width/layout.
      let staging = document.getElementById('mermaid-staging-area');
      if (!staging) {
          staging = document.createElement('div');
          staging.id = 'mermaid-staging-area';
          staging.style.visibility = 'hidden';
          staging.style.position = 'fixed';
          staging.style.top = '0';
          staging.style.left = '0';
          // Simulate the preview width for correct flowchart wrapping
          staging.style.width = '375px'; 
          document.body.appendChild(staging);
      }
      staging.innerHTML = ''; // Clear previous

      for (const codeEl of Array.from(mermaidCodeBlocks)) {
          const code = codeEl.textContent || '';
          const preEl = codeEl.parentElement;
          
          try {
              const id = 'mermaid-' + crypto.randomUUID();
              
              // Render in the staging area
              const { svg } = await mermaid.render(id, code, staging);
              
              // Convert the resulting SVG to a PNG image
              const pngBase64 = await svgToPngBase64(svg);
              
              if (pngBase64 && preEl) {
                  const img = doc.createElement('img');
                  img.src = pngBase64;
                  img.alt = "Mermaid Diagram";
                  img.classList.add('mermaid-diagram');
                  img.style.maxWidth = '100%';
                  img.style.height = 'auto';
                  img.style.display = 'block';
                  img.style.margin = '20px auto';
                  
                  // Replace the original <pre> block
                  if (preEl.tagName === 'PRE') {
                      preEl.replaceWith(img);
                  } else {
                      codeEl.replaceWith(img);
                  }
              }
          } catch (e) {
              console.error('Mermaid render error:', e);
              // Fallback: render as plain code
              codeEl.classList.remove('language-mermaid');
              codeEl.classList.add('language-plaintext');
          }
      }
      // Cleanup staging is optional, keeping it empty is fine
      staging.innerHTML = '';
  }

  // 7. Apply Themes & Styles
  const theme = { ...ARTICLE_THEMES[themeName] || ARTICLE_THEMES['default'] };
  const codeTheme = CODE_THEMES[codeThemeName] || CODE_THEMES['github'];

  // Override base styles with dynamic user settings
  const dynamicSpacing = `margin-bottom: ${paragraphSpacing}px;`;
  const dynamicHeaderSpacing = `margin-bottom: ${headerSpacing}px;`;
  const dynamicFontSize = `font-size: ${fontSize}px;`;
  const dynamicLineHeight = `line-height: ${lineHeight};`;
  const dynamicLetterSpacing = `letter-spacing: ${letterSpacing}em;`;

  const commonBodyStyle = `${dynamicFontSize} ${dynamicSpacing} ${dynamicLineHeight} ${dynamicLetterSpacing}`;

  // Merge dynamic styles carefully
  // We append to existing styles to ensure we don't lose theme-specific properties (like colors)
  theme.p = `${theme.p || ''}; ${commonBodyStyle}`;
  theme.li = `${theme.li || ''}; ${commonBodyStyle}`;
  theme.ul = `${theme.ul || ''}; ${commonBodyStyle}`;
  theme.ol = `${theme.ol || ''}; ${commonBodyStyle}`;
  theme.blockquote = `${theme.blockquote || ''}; ${commonBodyStyle}`;
  
  // Headers needs careful handling to not break "border-bottom" etc.
  theme.h1 = `${theme.h1 || ''}; ${dynamicHeaderSpacing} ${dynamicLineHeight} ${dynamicLetterSpacing}`;
  theme.h2 = `${theme.h2 || ''}; ${dynamicHeaderSpacing} ${dynamicLineHeight} ${dynamicLetterSpacing}`;
  theme.h3 = `${theme.h3 || ''}; ${dynamicHeaderSpacing} ${dynamicLineHeight} ${dynamicLetterSpacing}`;

  const applyStyle = (selector: string, style: string) => {
    if (!style) return;
    const elements = doc.querySelectorAll(selector);
    elements.forEach((el) => {
      // Append, don't just overwrite, but usually we want the theme to dictate fully
      // However, we must preserve any specific inline styles added by libraries (rare here)
      el.setAttribute('style', style); 
    });
  };

  // Apply Element Styles
  applyStyle('h1', theme.h1);
  applyStyle('h2', theme.h2);
  applyStyle('h3', theme.h3);
  applyStyle('p', theme.p);
  applyStyle('li', theme.li);
  applyStyle('ul', theme.ul);
  applyStyle('ol', theme.ol);
  applyStyle('blockquote', theme.blockquote);
  applyStyle('a', theme.link);
  applyStyle('strong', theme.strong);
  applyStyle('em', theme.em);
  applyStyle('hr', theme.hr);
  applyStyle('img', theme.img);
  applyStyle('table', theme.table || '');
  applyStyle('th', theme.th || '');
  applyStyle('td', theme.td || '');
  if (theme['math-inline']) applyStyle('.math-inline', theme['math-inline']);
  if (theme['math-block']) applyStyle('.math-block', theme['math-block']);

  // 8. Handle Code Blocks
  const preBlocks = doc.querySelectorAll('pre');
  preBlocks.forEach((pre) => {
    // Reset any pre-existing classes/styles
    let preStyle = theme.pre + `background: ${codeTheme.background};`;
    
    if (isMacStyle) {
      const headerDiv = doc.createElement('div');
      headerDiv.setAttribute('style', MAC_HEADER_STYLE);
      headerDiv.innerHTML = `
        <div style="${MAC_DOT_RED}"></div>
        <div style="${MAC_DOT_YELLOW}"></div>
        <div style="${MAC_DOT_GREEN}"></div>
      `;
      pre.prepend(headerDiv);
    }

    const code = pre.querySelector('code');
    if (code) {
      const spans = code.querySelectorAll('span');
      spans.forEach((span) => {
        const cls = Array.from(span.classList).find(c => c.startsWith('hljs-'));
        if (cls && codeTheme[cls]) {
          span.setAttribute('style', `color: ${codeTheme[cls]}`);
        }
        span.removeAttribute('class');
      });

      code.setAttribute('style', `font-family: 'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6; display: block; overflow-x: auto; padding: 15px; color: ${codeTheme.color}; white-space: pre;`);
      code.removeAttribute('class');
    }
    pre.setAttribute('style', preStyle);
  });

  // 9. Handle Inline Code
  const inlineCodes = doc.querySelectorAll('code');
  inlineCodes.forEach((code) => {
    if (code.parentElement?.tagName !== 'PRE' && !code.classList.contains('hljs')) {
        if (theme.code_inline) {
            code.setAttribute('style', theme.code_inline);
        }
    }
  });
  
  // 10. Wrap output
  const wrapper = doc.createElement('section');
  wrapper.setAttribute('style', `${theme.block || ''}; ${dynamicLineHeight} ${dynamicLetterSpacing}`);
  while (doc.body.firstChild) {
    wrapper.appendChild(doc.body.firstChild);
  }
  
  return wrapper.outerHTML;
};