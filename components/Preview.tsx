import React from 'react';

interface PreviewProps {
  html: string;
}

export const Preview: React.FC<PreviewProps> = ({ html }) => {
  return (
    <div className="h-full w-full bg-gray-100/50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
       {/* 
         Device Simulator
         - Centered via parent Flexbox
         - Dynamic width: fills space up to 375px (mobile width)
         - Fixed height: fills available parent height (viewport simulation)
         - Internal scrolling: content scrolls inside the 'device'
       */}
       <div className="relative w-full max-w-[375px] h-full bg-white shadow-2xl rounded-xl overflow-hidden ring-1 ring-black/5 flex flex-col transition-all duration-300">
          <div className="flex-1 overflow-y-auto bg-white">
             {/* 
               Content wrapper
               ID: preview-render-root is used by html2canvas
             */}
             <div 
               id="preview-render-root"
               className="preview-content min-h-full bg-white font-sans leading-relaxed text-gray-800"
               dangerouslySetInnerHTML={{ __html: html }} 
             />
          </div>
       </div>
    </div>
  );
};
