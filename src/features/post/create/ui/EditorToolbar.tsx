'use client';

import type { Editor } from '@tiptap/react';
import { Button } from '@/shared/ui/button';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const toolbarGroups = [
    {
      label: 'Text',
      buttons: [
        {
          label: 'B',
          title: 'Bold',
          isActive: () => editor.isActive('bold'),
          onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
          label: 'I',
          title: 'Italic',
          isActive: () => editor.isActive('italic'),
          onClick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          label: 'S',
          title: 'Strike',
          isActive: () => editor.isActive('strike'),
          onClick: () => editor.chain().focus().toggleStrike().run(),
        },
        {
          label: '</>',
          title: 'Code',
          isActive: () => editor.isActive('code'),
          onClick: () => editor.chain().focus().toggleCode().run(),
        },
      ],
    },
    {
      label: 'Headings',
      buttons: [
        {
          label: 'H1',
          title: 'Heading 1',
          isActive: () => editor.isActive('heading', { level: 1 }),
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          label: 'H2',
          title: 'Heading 2',
          isActive: () => editor.isActive('heading', { level: 2 }),
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          label: 'H3',
          title: 'Heading 3',
          isActive: () => editor.isActive('heading', { level: 3 }),
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
      ],
    },
    {
      label: 'Lists',
      buttons: [
        {
          label: '• List',
          title: 'Bullet List',
          isActive: () => editor.isActive('bulletList'),
          onClick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
          label: '1. List',
          title: 'Ordered List',
          isActive: () => editor.isActive('orderedList'),
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
        },
      ],
    },
    {
      label: 'Blocks',
      buttons: [
        {
          label: '{ }',
          title: 'Code Block',
          isActive: () => editor.isActive('codeBlock'),
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        },
        {
          label: '"',
          title: 'Quote',
          isActive: () => editor.isActive('blockquote'),
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
          label: '—',
          title: 'Divider',
          isActive: () => false,
          onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
      ],
    },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex gap-4 flex-wrap bg-gray-50 dark:bg-gray-800">
      {toolbarGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex gap-1 items-center">
          {group.buttons.map((button, buttonIndex) => (
            <Button
              key={buttonIndex}
              type="button"
              size="sm"
              variant={button.isActive() ? 'primary' : 'ghost'}
              onClick={button.onClick}
              title={button.title}
            >
              {button.label}
            </Button>
          ))}
          {groupIndex < toolbarGroups.length - 1 && (
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
