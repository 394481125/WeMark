import React, { forwardRef } from 'react';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({ value, onChange }, ref) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <textarea
        ref={ref}
        className="flex-1 w-full h-full p-6 resize-none outline-none font-mono text-sm leading-relaxed text-gray-800 bg-transparent border-r border-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type markdown here..."
        spellCheck={false}
      />
    </div>
  );
});

Editor.displayName = 'Editor';
