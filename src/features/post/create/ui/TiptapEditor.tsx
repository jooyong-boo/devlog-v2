'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { EditorToolbar } from '@/features/post/create/ui/EditorToolbar';

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
      Link.configure({
        openOnClick: false,
      }),
      TiptapImage,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg dark:prose-invert max-w-none p-4 min-h-[400px] focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="flex h-112.5 items-center justify-center rounded-lg border text-gray-400">
        에디터 로딩 중...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
