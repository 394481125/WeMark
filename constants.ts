import { StyleMap, CodeColorMap } from './types';

// --- Base Styles (Global defaults) ---
const BASE_STYLES: StyleMap = {
  block: "font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 16px; line-height: 1.8; color: #333; text-align: justify; letter-spacing: 0.05em; padding: 20px;",
  p: "margin: 0 0 24px 0; font-size: 16px; line-height: 1.8; color: #3f3f3f; text-align: justify;",
  
  // List Styles
  li: "margin-bottom: 8px; font-size: 16px; color: #3f3f3f; line-height: 1.65;",
  ul: "padding-left: 28px; margin-bottom: 24px; list-style-type: disc;",
  ol: "padding-left: 28px; margin-bottom: 24px; list-style-type: decimal;",
  
  // Images
  // Ensure we don't force width 100% on diagrams which might be smaller
  img: "display: block; width: auto; max-width: 100%; border-radius: 8px; margin: 24px auto; box-shadow: 0 8px 20px rgba(0,0,0,0.06);",
  
  strong: "font-weight: 700; color: #222;",
  em: "font-style: italic; opacity: 0.85;",
  hr: "border: none; border-top: 1px solid #e5e7eb; margin: 40px 0; height: 1px;",
  
  // Code Block Container
  pre: "padding: 0; margin: 24px 0; border-radius: 12px; overflow: hidden; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.08); line-height: 1.5;",
  
  // Default Inline Code (fallback)
  code_inline: "font-family: 'JetBrains Mono', Consolas, monospace; font-size: 85%; background-color: rgba(27,31,35,0.05); color: #24292e; padding: 3px 6px; border-radius: 4px; margin: 0 3px;",
  
  figcaption: "text-align: center; color: #888; font-size: 13px; margin-top: -12px; margin-bottom: 24px; opacity: 0.8;",
  link: "text-decoration: none; border-bottom: 1px solid rgba(0,0,0,0.2); transition: all 0.2s;",
  
  // Table Styles
  table: "border-collapse: collapse; width: 100%; margin: 24px 0; max-width: 100%; overflow-x: auto; display: table; font-size: 14px;",
  th: "background-color: #f8fafc; padding: 12px 16px; border: 1px solid #e2e8f0; font-weight: 600; text-align: left; color: #1e293b;",
  td: "padding: 12px 16px; border: 1px solid #e2e8f0; color: #475569; vertical-align: top;",

  // Math Styles
  "math-inline": "display: inline-block; width: auto; height: auto; vertical-align: middle; margin: 0 4px; border: none; box-shadow: none; border-radius: 0; max-width: 100%;",
  "math-block": "display: block; width: auto; max-width: 100%; height: auto; margin: 24px auto; border: none; box-shadow: none; border-radius: 0;",
};

// Helper to merge styles
const merge = (base: StyleMap, custom: StyleMap): StyleMap => ({ ...base, ...custom });

export const ARTICLE_THEMES: Record<string, StyleMap> = {
  default: merge(BASE_STYLES, {
    h1: "font-size: 24px; font-weight: bold; color: #333; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 1px solid #eaeaea; text-align: center;",
    h2: "font-size: 18px; font-weight: bold; color: #07c160; background: rgba(7, 193, 96, 0.1); padding: 8px 16px; border-radius: 6px; border-left: 4px solid #07c160; margin: 40px 0 20px 0; display: inline-block;",
    h3: "font-size: 16px; font-weight: bold; color: #333; margin: 30px 0 15px 0; padding-left: 10px; border-left: 4px solid #07c160; line-height: 1.4;",
    blockquote: "border-left: 4px solid #07c160; background: #f9f9f9; color: #555; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; font-size: 15px;",
    link: "color: #07c160; text-decoration: none; border-bottom: 1px solid rgba(7, 193, 96, 0.4);",
    strong: "font-weight: 700; color: #07c160;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #f0fdf4; color: #15803d; padding: 3px 6px; border-radius: 4px; margin: 0 3px;",
  }),
  
  zhihu: merge(BASE_STYLES, {
    h1: "font-size: 26px; font-weight: 800; color: #121212; margin-bottom: 30px; text-align: left; line-height: 1.4;",
    h2: "font-size: 20px; font-weight: 700; color: #056de8; margin: 40px 0 20px 0; display: flex; align-items: center; background: linear-gradient(90deg, rgba(5,109,232,0.08) 0%, transparent 100%); padding: 8px 12px; border-radius: 4px;",
    h3: "font-size: 17px; font-weight: 600; color: #121212; margin: 30px 0 15px 0; border-bottom: 2px solid #056de8; display: inline-block; padding-bottom: 4px;",
    blockquote: "border-left: 4px solid #056de8; background: #f6f6f6; color: #646464; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;",
    link: "color: #056de8; text-decoration: none; border-bottom: 1px solid rgba(5, 109, 232, 0.3); font-weight: 500;",
    strong: "font-weight: 700; color: #056de8;",
    th: "background-color: #f0f6ff; padding: 12px; border: 1px solid #dbeafe; font-weight: 600; color: #056de8;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #eef6ff; color: #056de8; padding: 3px 6px; border-radius: 4px; margin: 0 2px;",
  }),

  medium: merge(BASE_STYLES, {
    block: "font-family: Georgia, Cambria, 'Times New Roman', Times, serif; font-size: 18px; line-height: 1.9; color: #242424; padding: 20px; -webkit-font-smoothing: antialiased;",
    h1: "font-family: -apple-system, sans-serif; font-size: 30px; font-weight: 800; color: #111; margin-bottom: 30px; letter-spacing: -0.02em; line-height: 1.2;",
    h2: "font-family: -apple-system, sans-serif; font-size: 24px; font-weight: 700; color: #111; margin: 48px 0 24px 0; letter-spacing: -0.01em;",
    h3: "font-family: -apple-system, sans-serif; font-size: 20px; font-weight: 600; color: #111; margin: 32px 0 16px 0;",
    blockquote: "border-left: 3px solid #111; padding-left: 20px; font-style: italic; color: #555; font-size: 21px; margin: 36px 0; line-height: 1.6;",
    link: "color: #1a8917; text-decoration: underline; text-decoration-color: rgba(26,137,23,0.5); border: none;",
    strong: "font-weight: 700; color: #000;",
    code_inline: "font-family: monospace; font-size: 16px; background-color: rgba(0,0,0,0.06); color: #242424; padding: 3px 6px; border-radius: 3px; margin: 0 2px;",
  }),
  
  toutiao: merge(BASE_STYLES, {
    h1: "font-size: 26px; font-weight: bold; color: #222; margin-bottom: 24px; line-height: 1.4; border-left: 8px solid #f85959; padding-left: 16px;",
    h2: "font-size: 20px; font-weight: bold; color: #f85959; background: #fef0f0; padding: 8px 12px; border-radius: 4px; margin: 36px 0 18px 0; display: inline-block;",
    h3: "font-size: 17px; font-weight: bold; color: #222; margin: 24px 0 12px 0; padding-left: 8px; border-left: 4px solid #f85959;",
    blockquote: "border-left: none; border-top: 2px solid #f85959; background: #f9f9f9; color: #666; padding: 16px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);",
    link: "color: #f85959; text-decoration: none; font-weight: 500;",
    strong: "color: #f85959; font-weight: bold;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #fff1f1; color: #d32f2f; padding: 2px 5px; border-radius: 3px; margin: 0 2px; border: 1px solid #ffcdd2;",
  }),

  tech: merge(BASE_STYLES, {
    block: "font-family: 'PingFang SC', -apple-system, sans-serif; font-size: 15px; line-height: 1.8; color: #334155; padding: 20px;",
    h1: "font-size: 24px; font-weight: 900; background: linear-gradient(135deg, #2563eb, #9333ea); -webkit-background-clip: text; color: transparent; margin-bottom: 30px; text-align: center; padding-bottom: 10px; border-bottom: 1px solid rgba(37,99,235,0.2);",
    h2: "font-size: 18px; font-weight: 700; color: white; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 8px 20px; border-radius: 20px 20px 20px 0; margin: 40px 0 20px 0; display: inline-block; box-shadow: 4px 6px 15px rgba(37, 99, 235, 0.3); letter-spacing: 0.05em;",
    h3: "font-size: 16px; font-weight: 700; color: #1e40af; margin: 30px 0 15px 0; padding-left: 12px; border-left: 4px solid #60a5fa;",
    blockquote: "border: none; border-left: 4px solid #3b82f6; background: #f1f5f9; color: #475569; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;",
    link: "color: #2563eb; text-decoration: none; border-bottom: 1px dashed #2563eb; transition: color 0.2s;",
    th: "background-color: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; font-weight: bold;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 13px; background-color: #eff6ff; color: #2563eb; padding: 4px 8px; border-radius: 6px; margin: 0 3px; border: 1px solid #dbeafe;",
  }),

  cyber: merge(BASE_STYLES, {
    h1: "font-size: 26px; font-weight: 900; color: #7c3aed; text-align: center; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 30px; text-shadow: 2px 2px 0px #a78bfa;",
    h2: "font-size: 20px; font-weight: 800; color: #fff; background: linear-gradient(90deg, #7c3aed, #db2777); padding: 8px 24px; transform: skew(-12deg); display: inline-block; margin: 40px 0 24px 0; box-shadow: 5px 5px 0 rgba(0,0,0,0.1);",
    h3: "font-size: 18px; font-weight: 700; color: #db2777; margin: 30px 0 15px 0; border-bottom: 3px solid #fbcfe8; display: inline-block; padding-bottom: 5px;",
    blockquote: "background: #fdf4ff; border-left: 6px solid #c026d3; color: #86198f; padding: 20px; margin-bottom: 24px; font-weight: 600; border-radius: 4px;",
    link: "color: #7c3aed; font-weight: 800; text-decoration: none; background: linear-gradient(180deg, transparent 70%, #ddd6fe 70%);",
    strong: "color: #c026d3; background: #fae8ff; padding: 0 4px;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #f5f3ff; color: #7c3aed; padding: 3px 6px; border-radius: 4px; margin: 0 2px; border: 1px solid #c4b5fd;",
  }),

  sakura: merge(BASE_STYLES, {
    h1: "font-size: 24px; font-weight: bold; color: #db2777; text-align: center; margin-bottom: 25px; border-bottom: 3px dotted #fbcfe8; padding-bottom: 15px;",
    h2: "font-size: 18px; font-weight: bold; color: #be185d; background: #fce7f3; padding: 8px 16px; border-radius: 16px; border: 1px solid #fbcfe8; margin: 40px 0 20px 0; display: inline-block; box-shadow: 2px 4px 10px rgba(251, 207, 232, 0.5);",
    h3: "font-size: 16px; font-weight: bold; color: #db2777; margin: 30px 0 15px 0; padding-left: 10px; border-left: 4px dotted #db2777;",
    blockquote: "background: #fff0f5; border: 1px dashed #f9a8d4; color: #9d174d; padding: 16px; margin-bottom: 24px; border-radius: 12px;",
    link: "color: #db2777; border-bottom: 2px dotted #db2777; text-decoration: none;",
    strong: "color: #be185d; background: #fdf2f8; padding: 0 2px;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #fdf2f8; color: #be185d; padding: 3px 6px; border-radius: 8px; margin: 0 2px; border: 1px solid #fbcfe8;",
  }),

  gold: merge(BASE_STYLES, {
    block: "font-family: 'Times New Roman', 'Songti SC', serif; font-size: 16px; line-height: 1.9; color: #1c1917; padding: 20px; background-color: #ffffff;",
    h1: "font-size: 26px; font-weight: bold; color: #92400e; text-align: center; border-top: 1px solid #b45309; border-bottom: 1px solid #b45309; padding: 18px 0; margin-bottom: 36px; letter-spacing: 0.1em;",
    h2: "font-size: 19px; font-weight: bold; color: #fff; background: linear-gradient(45deg, #27272a, #52525b); padding: 10px 24px; margin: 40px 0 20px 0; display: inline-block; border-left: 4px solid #d97706; box-shadow: 4px 4px 0 #d97706;",
    h3: "font-size: 17px; font-weight: bold; color: #92400e; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px; margin: 30px 0 15px 0; display: inline-block;",
    blockquote: "border-left: 3px solid #d97706; background: #fffbeb; color: #78350f; padding: 16px 24px; margin-bottom: 24px; font-style: italic;",
    link: "color: #b45309; border-bottom: 1px solid #b45309;",
    strong: "color: #92400e; font-weight: bold;",
    code_inline: "font-family: serif; font-size: 15px; background-color: #fff7ed; color: #92400e; padding: 3px 6px; border-radius: 2px; margin: 0 2px; border: 1px solid #fdba74;",
  }),

  antique: merge(BASE_STYLES, {
    block: "font-family: 'Kaiti SC', 'KaiTi', 'STKaiti', serif; font-size: 18px; line-height: 1.8; color: #44403c; padding: 20px; background-color: #f9f7f0;",
    h1: "font-size: 28px; font-weight: bold; color: #78350f; text-align: center; margin-bottom: 40px; text-shadow: 0 1px 0 rgba(255,255,255,0.5);",
    h2: "font-size: 22px; font-weight: bold; color: #78350f; border-bottom: 2px solid #a8a29e; padding-bottom: 8px; margin: 48px 0 24px 0; display: block; text-align: center;",
    h3: "font-size: 19px; font-weight: bold; color: #57534e; margin: 32px 0 16px 0; display: flex; align-items: center; justify-content: center;",
    blockquote: "border: 1px solid #d6d3d1; background: transparent; color: #57534e; padding: 24px; margin-bottom: 24px; position: relative;",
    link: "color: #78350f; border-bottom: 1px solid #78350f;",
    strong: "color: #78350f; font-weight: 900;",
    th: "background-color: #f5f5f4; color: #44403c; border: 1px solid #d6d3d1; font-weight: bold;",
    td: "border: 1px solid #d6d3d1; padding: 12px; color: #44403c;",
    code_inline: "font-family: 'Kaiti SC', 'KaiTi', serif; font-size: 16px; background-color: rgba(120, 53, 15, 0.05); color: #78350f; padding: 2px 6px; border-radius: 4px; margin: 0 2px;",
  }),

  simple: merge(BASE_STYLES, {
    h1: "font-size: 26px; font-weight: 900; color: #000; letter-spacing: -0.5px; margin-bottom: 32px; border-bottom: 4px solid #000; padding-bottom: 16px; text-align: left;",
    h2: "font-size: 21px; font-weight: 800; color: #000; margin: 48px 0 24px 0; background: #000; color: #fff; display: inline-block; padding: 6px 16px;",
    h3: "font-size: 18px; font-weight: 700; color: #000; margin: 32px 0 16px 0; text-decoration: underline; text-decoration-thickness: 3px;",
    blockquote: "border-left: 6px solid #000; padding-left: 20px; color: #000; font-weight: 500; margin-bottom: 24px; font-style: normal;",
    link: "color: #000; border-bottom: 2px solid #000; font-weight: 600;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #fff; color: #000; padding: 3px 6px; border-radius: 0; margin: 0 2px; border: 1px solid #000;",
  }),

  orange: merge(BASE_STYLES, {
    h1: "font-size: 24px; font-weight: 800; color: #ea580c; border-bottom: 2px solid #fed7aa; padding-bottom: 12px; margin-bottom: 24px; text-align: center;",
    h2: "font-size: 19px; font-weight: 800; color: #c2410c; margin: 36px 0 18px 0; background: #fff7ed; padding: 10px 16px; border-radius: 8px; border-left: 5px solid #ea580c;",
    h3: "font-size: 17px; font-weight: 700; color: #ea580c; margin: 24px 0 12px 0; padding-bottom: 4px; border-bottom: 1px dashed #fdba74; display: inline-block;",
    blockquote: "border: none; background: #fff7ed; color: #9a3412; padding: 16px; margin-bottom: 24px; border-radius: 8px; border-left: 4px solid #fb923c;",
    link: "color: #ea580c; border-bottom: 1px solid #ea580c; text-decoration: none;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #fff7ed; color: #ea580c; padding: 3px 6px; border-radius: 4px; margin: 0 2px; border: 1px solid #fed7aa;",
  }),

  lapis: merge(BASE_STYLES, {
    h1: "font-size: 24px; font-weight: 800; text-align: center; color: #1e3a8a; margin-bottom: 30px; border-bottom: 2px solid #bfdbfe; padding-bottom: 16px;",
    h2: "font-size: 19px; font-weight: 800; background: #eff6ff; color: #172554; padding: 10px 16px; border-radius: 6px; border-left: 5px solid #1e40af; margin: 36px 0 18px 0;",
    h3: "font-size: 17px; font-weight: 700; color: #1e40af; margin: 24px 0 12px 0; display: flex; align-items: center; gap: 8px;",
    blockquote: "border-left: 4px solid #2563eb; background: #eff6ff; color: #1e3a8a; padding: 16px 20px; margin-bottom: 24px; border-radius: 0 6px 6px 0;",
    link: "color: #1d4ed8; font-weight: 600; text-decoration: none; border-bottom: 1px solid #93c5fd;",
    strong: "font-weight: 700; color: #1e3a8a;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #eff6ff; color: #1e40af; padding: 3px 6px; border-radius: 4px; margin: 0 2px; border: 1px solid #bfdbfe;",
  }),

   green: merge(BASE_STYLES, {
    h1: "font-size: 24px; font-weight: 800; color: #065f46; text-align: center; border-bottom: 2px solid #a7f3d0; padding-bottom: 16px; margin-bottom: 28px;",
    h2: "font-size: 19px; font-weight: 800; color: #ffffff; background: #059669; padding: 8px 20px; border-radius: 50px; display: inline-block; margin: 36px 0 18px 0; box-shadow: 0 4px 6px rgba(5, 150, 105, 0.2);",
    h3: "font-size: 17px; font-weight: 700; color: #059669; margin: 24px 0 12px 0; padding-left: 10px; border-left: 4px solid #10b981;",
    blockquote: "border-left: 4px solid #10b981; background: #ecfdf5; color: #064e3b; padding: 18px; margin-bottom: 24px; border-radius: 8px;",
    link: "color: #059669; text-decoration: none; border-bottom: 1px solid #34d399;",
    code_inline: "font-family: 'JetBrains Mono', monospace; font-size: 14px; background-color: #ecfdf5; color: #047857; padding: 3px 6px; border-radius: 4px; margin: 0 2px; border: 1px solid #a7f3d0;",
  }),
};

// --- Code Highlighting Themes ---
export const CODE_THEMES: Record<string, CodeColorMap> = {
  github: {
    background: "#f6f8fa",
    color: "#24292e",
    "hljs-comment": "#6a737d",
    "hljs-quote": "#6a737d",
    "hljs-keyword": "#d73a49",
    "hljs-selector-tag": "#22863a",
    "hljs-string": "#032f62",
    "hljs-title": "#6f42c1",
    "hljs-section": "#005cc5",
    "hljs-variable": "#e36209",
    "hljs-template-variable": "#e36209",
    "hljs-name": "#22863a",
    "hljs-attr": "#6f42c1",
    "hljs-number": "#005cc5",
    "hljs-literal": "#005cc5",
    "hljs-type": "#6f42c1",
    "hljs-params": "#24292e",
    "hljs-built_in": "#005cc5",
    "hljs-function": "#6f42c1"
  },
  dracula: {
    background: "#282a36",
    color: "#f8f8f2",
    "hljs-comment": "#6272a4",
    "hljs-quote": "#6272a4",
    "hljs-keyword": "#ff79c6",
    "hljs-selector-tag": "#8be9fd",
    "hljs-string": "#f1fa8c",
    "hljs-title": "#50fa7b",
    "hljs-section": "#50fa7b",
    "hljs-variable": "#8be9fd",
    "hljs-template-variable": "#8be9fd",
    "hljs-name": "#ff79c6",
    "hljs-attr": "#50fa7b",
    "hljs-number": "#bd93f9",
    "hljs-literal": "#bd93f9",
    "hljs-type": "#8be9fd",
    "hljs-params": "#f8f8f2",
    "hljs-built_in": "#8be9fd",
    "hljs-function": "#50fa7b"
  },
  atom: {
    background: "#282c34",
    color: "#abb2bf",
    "hljs-comment": "#5c6370; font-style: italic",
    "hljs-quote": "#5c6370; font-style: italic",
    "hljs-keyword": "#c678dd",
    "hljs-selector-tag": "#e06c75",
    "hljs-string": "#98c379",
    "hljs-title": "#61afef",
    "hljs-section": "#e06c75",
    "hljs-variable": "#e06c75",
    "hljs-template-variable": "#e06c75",
    "hljs-name": "#e06c75",
    "hljs-attr": "#d19a66",
    "hljs-number": "#d19a66",
    "hljs-literal": "#56b6c2",
    "hljs-type": "#56b6c2",
    "hljs-params": "#abb2bf",
    "hljs-built_in": "#e6c07b",
    "hljs-function": "#61afef"
  },
  monokai: {
    background: "#272822",
    color: "#f8f8f2",
    "hljs-comment": "#75715e",
    "hljs-keyword": "#f92672",
    "hljs-selector-tag": "#f92672",
    "hljs-string": "#e6db74",
    "hljs-title": "#a6e22e",
    "hljs-section": "#a6e22e",
    "hljs-variable": "#f8f8f2",
    "hljs-template-variable": "#f8f8f2",
    "hljs-name": "#f92672",
    "hljs-attr": "#a6e22e",
    "hljs-number": "#ae81ff",
    "hljs-literal": "#ae81ff",
    "hljs-type": "#66d9ef",
    "hljs-params": "#f8f8f2",
    "hljs-built_in": "#66d9ef",
    "hljs-function": "#a6e22e"
  },
  vscode: {
    background: "#1e1e1e",
    color: "#d4d4d4",
    "hljs-comment": "#6a9955",
    "hljs-keyword": "#569cd6",
    "hljs-selector-tag": "#569cd6",
    "hljs-string": "#ce9178",
    "hljs-title": "#dcdcaa",
    "hljs-section": "#dcdcaa",
    "hljs-variable": "#9cdcfe",
    "hljs-template-variable": "#9cdcfe",
    "hljs-name": "#569cd6",
    "hljs-attr": "#9cdcfe",
    "hljs-number": "#b5cea8",
    "hljs-literal": "#569cd6",
    "hljs-type": "#4ec9b0",
    "hljs-params": "#d4d4d4",
    "hljs-built_in": "#4ec9b0",
    "hljs-function": "#dcdcaa"
  }
};

export const MAC_HEADER_STYLE = "display: flex; gap: 8px; padding: 14px 16px 8px; background: inherit; border-top-left-radius: 12px; border-top-right-radius: 12px;";
export const MAC_DOT_RED = "width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; border: 1px solid #e0443e; box-shadow: 0 0 0 0.5px #e0443e;";
export const MAC_DOT_YELLOW = "width: 12px; height: 12px; border-radius: 50%; background: #febc2e; border: 1px solid #d89e24; box-shadow: 0 0 0 0.5px #d89e24;";
export const MAC_DOT_GREEN = "width: 12px; height: 12px; border-radius: 50%; background: #28c840; border: 1px solid #1aab29; box-shadow: 0 0 0 0.5px #1aab29;";
