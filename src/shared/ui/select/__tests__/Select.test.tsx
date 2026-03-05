import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('@radix-ui/react-select', async () => {
  const React = await import('react');

  type SelectContextValue = {
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    open?: boolean;
    expanded?: boolean;
  };

  const SelectContext = React.createContext<SelectContextValue>({});

  const Root = ({
    children,
    onValueChange,
    disabled,
    open,
    expanded,
  }: React.PropsWithChildren<SelectContextValue>) => (
    <SelectContext.Provider value={{ onValueChange, disabled, open, expanded }}>
      {children}
    </SelectContext.Provider>
  );

  const Trigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'>
  >(({ children, ...props }, ref) => {
    const { disabled, open, expanded } = React.useContext(SelectContext);
    return (
      <button
        ref={ref}
        role="combobox"
        disabled={disabled}
        {...props}
        aria-expanded={Boolean(open ?? expanded ?? false)}
      >
        {children}
      </button>
    );
  });
  Trigger.displayName = 'Trigger';

  const Value = ({ placeholder }: { placeholder?: string }) => (
    <span>{placeholder}</span>
  );

  const Icon = ({
    children,
    asChild,
  }: React.PropsWithChildren<{ asChild?: boolean }>) =>
    asChild ? <>{children}</> : <span>{children}</span>;

  const SimpleWrapper = ({
    children,
  }: React.PropsWithChildren<Record<string, never>>) => <div>{children}</div>;

  const Item = ({
    children,
    value,
    disabled,
    ...props
  }: React.PropsWithChildren<{
    value: string;
    disabled?: boolean;
  }>) => {
    const { onValueChange } = React.useContext(SelectContext);
    return (
      <button
        type="button"
        role="option"
        disabled={disabled}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        {children}
      </button>
    );
  };

  return {
    Root,
    Trigger,
    Value,
    Icon,
    Portal: SimpleWrapper,
    Content: SimpleWrapper,
    ScrollUpButton: SimpleWrapper,
    ScrollDownButton: SimpleWrapper,
    Viewport: SimpleWrapper,
    Item,
    ItemText: SimpleWrapper,
    ItemIndicator: SimpleWrapper,
  };
});

import { Select } from '@/shared/ui/select/Select';

const options = [
  { value: '', label: '전체' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
];

describe('<Select />', () => {
  it('label과 required 표시를 렌더링해야 한다', () => {
    render(
      <Select id="category" options={options} label="카테고리" required />
    );

    const label = screen.getByText('카테고리');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveTextContent('*');
    expect(label).toHaveAttribute('for', 'category');
  });

  it('placeholder와 helperText를 표시해야 한다', () => {
    render(
      <Select
        id="category"
        options={options}
        placeholder="선택하세요"
        helperText="하나를 선택해 주세요."
      />
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('선택하세요');
    expect(screen.getByText('하나를 선택해 주세요.')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby', 'category-helper');
    expect(trigger).toHaveAttribute('aria-invalid', 'false');
  });

  it('error가 있으면 helperText 대신 error 메시지를 표시해야 한다', () => {
    render(
      <Select
        id="category"
        options={options}
        helperText="하나를 선택해 주세요."
        error="필수 항목입니다."
      />
    );

    const trigger = screen.getByRole('combobox');
    expect(screen.getByRole('alert')).toHaveTextContent('필수 항목입니다.');
    expect(screen.queryByText('하나를 선택해 주세요.')).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby', 'category-error');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
  });

  it('선택한 옵션 값을 onValueChange로 전달해야 한다', () => {
    const onValueChange = vi.fn();
    render(<Select options={options} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('option', { name: 'Frontend' }));
    expect(onValueChange).toHaveBeenCalledWith('frontend');
  });

  it('빈 문자열 옵션을 선택하면 빈 문자열을 전달해야 한다', () => {
    const onValueChange = vi.fn();
    render(<Select options={options} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('option', { name: '전체' }));
    expect(onValueChange).toHaveBeenCalledWith('');
  });

  it('disabled 상태를 반영해야 한다', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
