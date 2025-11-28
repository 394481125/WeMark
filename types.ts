

export type ArticleTheme = 
  | 'default' 
  | 'zhihu' 
  | 'medium' 
  | 'toutiao'
  | 'tech' 
  | 'cyber' 
  | 'sakura' 
  | 'antique' 
  | 'gold' 
  | 'lapis' 
  | 'orange' 
  | 'green' 
  | 'simple';

export type CodeTheme = 'github' | 'dracula' | 'atom' | 'vscode' | 'monokai';

export interface StyleMap {
  [key: string]: string; // e.g., 'h1': 'font-size: 20px; ...'
}

export interface CodeColorMap {
  background: string;
  color: string;
  [key: string]: string; // hljs class to color mapping
}

export interface AppState {
  content: string;
  articleTheme: ArticleTheme;
  codeTheme: CodeTheme;
  isMacStyle: boolean;
  fontSize: number;
  paragraphSpacing: number;
  headerSpacing: number;
  lineHeight: number;
  letterSpacing: number;
}

export const SAMPLE_MARKDOWN = `# 文颜 WeMark 排版工具

> 专为公众号、知乎、头条打造的 **Markdown** 美化工具。
> 完美支持代码高亮、**数学公式**、**Mermaid图表**与样式一键复制。

## 🎨 核心特性

1.  **多平台适配**：完美兼容微信公众号、知乎、今日头条。
2.  **海量主题**：内置 10+ 种精美排版风格，满足科技、人文、职场需求。
3.  **Mac 代码风格**：支持 macOS 窗口风格代码块。
4.  **图表与公式**：自动将 Mermaid 流程图和 LaTeX 公式转换为图片。

## 📊 图表演示 (Mermaid)

支持流程图、时序图、甘特图等，自动渲染为高清图片：

\`\`\`mermaid
graph LR
    A[Markdown] -->|Parse| B(HTML)
    B -->|Inline Styles| C{Theme Engine}
    C -->|CSS Injection| D[WeChat Ready]
    C -->|Image Gen| E[PNG/JPG]
\`\`\`

## 📐 数学公式演示 (LaTeX)

行内公式：爱因斯坦的质能方程是 $E = mc^2$，这是物理学的基石。

块级公式：
$$
f(x) = \\int_{-\\infty}^\\infty \\widehat f\\xi\\,e^{2\\pi i \\xi x} \\,d\\xi
$$

## 💻 代码演示

\`\`\`tsx
interface Props {
  title: string;
  isActive: boolean;
}

const Card: React.FC<Props> = ({ title, isActive }) => {
  return (
    <div className={\`p-4 rounded \${isActive ? 'bg-blue-500' : 'bg-gray-100'}\`}>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};
\`\`\`

祝您创作愉快！
`;