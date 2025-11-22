'use client';

import { useEffect, useRef } from 'react';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';

// Tiptap UI Components (simplified)
import { Spacer } from '@/components/tiptap-ui-primitive/spacer';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap-ui-primitive/toolbar';
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu';
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu';
import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button';
import { LinkPopover } from '@/components/tiptap-ui/link-popover';
import { MarkButton } from '@/components/tiptap-ui/mark-button';
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button';

// Styles
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';

type BlogRichEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function BlogRichEditor({ value, onChange }: BlogRichEditorProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'blog-editor-content',
      },
    },
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Underline,
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="flex-1 w-full p-4 text-sm text-gray-400 border border-gray-200 rounded-lg bg-gray-50">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-white">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef} className="border-b border-gray-200 bg-gray-50">
          <Spacer />

          <ToolbarGroup>
            <UndoRedoButton action="undo" />
            <UndoRedoButton action="redo" />
          </ToolbarGroup>

          <ToolbarSeparator />

          <ToolbarGroup>
            <HeadingDropdownMenu levels={[2, 3]} portal={false} />
            <ListDropdownMenu
              types={['bulletList', 'orderedList']}
              portal={false}
            />
            <BlockquoteButton />
            <CodeBlockButton />
          </ToolbarGroup>

          <ToolbarSeparator />

          <ToolbarGroup>
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="code" />
            <MarkButton type="underline" />
            <LinkPopover />
          </ToolbarGroup>

          <Spacer />
        </Toolbar>

        <EditorContent
          editor={editor}
          className="flex-1 overflow-y-auto p-4 prose prose-sm max-w-none focus:outline-none"
        />
      </EditorContext.Provider>
    </div>
  );
}
