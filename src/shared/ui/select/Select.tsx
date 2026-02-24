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
    const EMPTY_VALUE_SENTINEL = React.useMemo(() => {
      let sentinel = '__radix-select-empty__';
      const values = new Set(options.map((option) => option.value));
      while (values.has(sentinel)) {
        sentinel += '_';
      }
      return sentinel;
    }, [options]);

    const normalizedOptions = React.useMemo(
      () =>
        options.map((option, index) => ({
          ...option,
          internalValue:
            option.value === '' ? EMPTY_VALUE_SENTINEL : option.value,
          key: `${option.value || '__empty__'}-${index}`,
        })),
      [options, EMPTY_VALUE_SENTINEL]
    );

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!onValueChange) return;
        onValueChange(nextValue === EMPTY_VALUE_SENTINEL ? '' : nextValue);
      },
      [onValueChange, EMPTY_VALUE_SENTINEL]
    );

    return (
      <div className="w-full">
        {label && (
          <Label.Root
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </Label.Root>
        )}

        <RadixSelect.Root
          value={value}
          onValueChange={handleValueChange}
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
              'flex w-full items-center justify-between rounded-lg border px-3 py-2 transition-colors',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-gray-100',
              'focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'data-placeholder:text-gray-400 dark:data-placeholder:text-gray-500',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600',
              className
            )}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon asChild>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={cn(
                'z-50 min-w-32 overflow-hidden rounded-lg border shadow-md',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700',
                'animate-in fade-in-0 zoom-in-95'
              )}
              position="popper"
              sideOffset={4}
            >
              <RadixSelect.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-gray-500">
                <ChevronUp className="h-4 w-4" />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-1">
                {normalizedOptions.map((option) => (
                  <RadixSelect.Item
                    key={option.key}
                    value={option.internalValue}
                    disabled={option.disabled}
                    className={cn(
                      'relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm outline-none select-none',
                      'text-gray-900 dark:text-gray-100',
                      'focus:bg-blue-50 focus:text-blue-600 dark:focus:bg-blue-900/20 dark:focus:text-blue-400',
                      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
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

              <RadixSelect.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
