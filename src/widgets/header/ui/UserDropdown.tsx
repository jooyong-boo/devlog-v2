'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';
import { Avatar } from '@/shared/ui/avatar';

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-full"
          aria-label={`${user.name || user.email} 메뉴 열기`}
        >
          <span className="text-sm font-medium hidden sm:inline">
            {user.name || user.email}
          </span>
          <Avatar
            src={user.image || ''}
            alt={user.name || 'User'}
            size="sm"
            fallback={user.name?.charAt(0) || 'U'}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 w-48 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-2 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {user.role === 'admin' && (
            <DropdownMenu.Item asChild>
              <a
                href="/admin"
                className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors outline-none cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                관리자 페이지
              </a>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut()}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors outline-none cursor-pointer focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              로그아웃
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
