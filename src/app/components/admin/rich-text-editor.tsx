'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    immediatelyRender: false,
    onUpdate({ editor }: { editor: any }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="flex-1 w-full p-4 text-sm text-gray-400 border border-gray-200 rounded-lg bg-gray-50">
        Loading editor...
      </div>
    );
  }

  const run = (fn: () => void) => {
    editor.chain().focus();
    fn();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-gray-500">
        <span className="mr-1 text-[11px] uppercase tracking-wide text-gray-400">
          Editor
        </span>
        <button
          type="button"
          onClick={() => run(() => editor.chain().toggleBold().run())}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 font-semibold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => run(() => editor.chain().toggleItalic().run())}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => run(() => editor.chain().toggleBulletList().run())}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => run(() => editor.chain().toggleOrderedList().run())}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => run(() => editor.chain().toggleHeading({ level: 2 }).run())}
          className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50 text-[11px] font-semibold"
        >
          H2
        </button>
      </div>
      <div className="flex-1 h-full min-h-[260px] border border-gray-200 rounded-lg bg-white overflow-hidden">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-3 focus:outline-none"
        />
      </div>
    </div>
  );
}
