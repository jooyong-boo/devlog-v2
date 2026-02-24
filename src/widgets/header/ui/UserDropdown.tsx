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
          className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={`${user.name || user.email} 메뉴 열기`}
        >
          <span className="hidden text-sm font-medium sm:inline">
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
          className="animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          {user.role === 'admin' && (
            <DropdownMenu.Item asChild>
              <a
                href="/admin"
                className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-900 transition-colors outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                관리자 페이지
              </a>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut()}
              className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-gray-900 transition-colors outline-none hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              로그아웃
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
