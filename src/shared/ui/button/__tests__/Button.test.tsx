import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('<Button />', () => {
  describe('렌더링', () => {
    it('children을 렌더링해야 한다', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('disabled 상태를 반영해야 한다', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('variant 스타일', () => {
    it('primary variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-blue-600');
    });

    it('secondary variant 클래스를 적용해야 한다', () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-gray-200');
    });

    it('outline variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('border');
    });

    it('ghost variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-transparent');
    });

    it('danger variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Button variant="danger">Danger</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('bg-red-600');
    });
  });

  describe('size 스타일', () => {
    it('sm size 클래스를 적용해야 한다', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('text-sm');
    });

    it('md size 클래스를 적용해야 한다 (기본값)', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-4');
      expect(button?.className).toContain('py-2');
    });

    it('lg size 클래스를 적용해야 한다', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('text-lg');
    });
  });

  describe('상호작용', () => {
    it('클릭 이벤트를 처리해야 한다', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서는 클릭 이벤트가 발생하지 않아야 한다', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('loading 상태에서는 클릭 이벤트가 발생하지 않아야 한다', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('loading 상태', () => {
    it('loading 상태일 때 스피너를 표시해야 한다', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      // Check for spinner SVG
      const spinner = button.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('loading 상태가 아닐 때는 스피너가 없어야 한다', () => {
      render(<Button>Normal</Button>);
      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg.animate-spin');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('아이콘', () => {
    it('leftIcon을 렌더링해야 한다', () => {
      render(
        <Button leftIcon={<span data-testid="left-icon">←</span>}>Back</Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('rightIcon을 렌더링해야 한다', () => {
      render(
        <Button rightIcon={<span data-testid="right-icon">→</span>}>
          Next
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('loading 상태일 때는 아이콘을 숨겨야 한다', () => {
      render(
        <Button
          loading
          leftIcon={<span data-testid="left-icon">←</span>}
          rightIcon={<span data-testid="right-icon">→</span>}
        >
          Loading
        </Button>
      );
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    });
  });

  describe('fullWidth', () => {
    it('fullWidth prop이 true일 때 w-full 클래스를 적용해야 한다', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('w-full');
    });

    it('fullWidth prop이 없을 때는 w-full 클래스가 없어야 한다', () => {
      const { container } = render(<Button>Normal Width</Button>);
      const button = container.querySelector('button');
      expect(button?.className).not.toContain('w-full');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className을 병합해야 한다', () => {
      const { container } = render(
        <Button className="custom-class">Custom</Button>
      );
      const button = container.querySelector('button');
      expect(button?.className).toContain('custom-class');
      // Should still have base classes
      expect(button?.className).toContain('bg-blue-600');
    });
  });
});
