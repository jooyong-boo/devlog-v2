'use client';

import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = '선택',
      label,
      error,
      helperText,
      id,
      required,
      disabled,
      className,
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <Label.Root
            htmlFor={selectId}
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </Label.Root>
        )}

        <RadixSelect.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          required={required}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={selectId}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            className={cn(
              'flex w-full items-center justify-between px-3 py-2 border rounded-lg transition-colors',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'data-[placeholder]:text-gray-400 dark:data-[placeholder]:text-gray-500',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600',
              className
            )}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon asChild>
              <ChevronDown
                className="h-4 w-4 text-gray-400 shrink-0"
                aria-hidden="true"
              />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-lg border shadow-md',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700',
                'animate-in fade-in-0 zoom-in-95'
              )}
              position="popper"
              sideOffset={4}
            >
              <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 text-gray-500 cursor-default">
                <ChevronUp className="h-4 w-4" />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-1">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      'relative flex items-center px-3 py-2 text-sm rounded-md cursor-pointer select-none outline-none',
                      'text-gray-900 dark:text-gray-100',
                      'focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600 dark:focus:text-blue-400',
                      'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                      'data-[state=checked]:font-medium'
                    )}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="absolute right-2 flex items-center">
                      <Check className="h-4 w-4" />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>

              <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-gray-500 cursor-default">
                <ChevronDown className="h-4 w-4" />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm text-red-500 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${selectId}-helper`} className="text-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
