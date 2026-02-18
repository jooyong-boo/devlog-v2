'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-scale-in z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {user.role === 'admin' && (
            <a
              href="/admin"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              관리자 페이지
            </a>
          )}

          <div className="py-1">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={() => signOut()}
              className="justify-start px-4 rounded-none"
            >
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
