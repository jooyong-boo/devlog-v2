import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('<Input />', () => {
  describe('렌더링', () => {
    it('input 요소를 렌더링해야 한다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label을 렌더링해야 한다', () => {
      render(<Input label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('placeholder를 표시해야 한다', () => {
      render(<Input placeholder="Enter your name" />);
      expect(
        screen.getByPlaceholderText('Enter your name')
      ).toBeInTheDocument();
    });

    it('helperText를 표시해야 한다', () => {
      render(<Input helperText="This is a hint" />);
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
    });

    it('error 메시지를 표시해야 한다', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('required prop이 true일 때 * 표시를 해야 한다', () => {
      render(<Input label="Email" required />);
      const label = screen.getByText('Email');
      expect(label.parentElement).toHaveTextContent('*');
    });
  });

  describe('상호작용', () => {
    it('입력 값을 변경할 수 있어야 한다', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test');
    });

    it('disabled 상태에서는 입력할 수 없어야 한다', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('스타일', () => {
    it('error 상태일 때 border-red 클래스를 적용해야 한다', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('border-red-500');
    });

    it('error가 없을 때는 일반 border 클래스를 적용해야 한다', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('border-gray-300');
    });
  });

  describe('아이콘', () => {
    it('leftIcon을 렌더링해야 한다', () => {
      render(<Input leftIcon={<span data-testid="left-icon">@</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('rightIcon을 렌더링해야 한다', () => {
      render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('leftIcon이 있을 때 padding-left를 적용해야 한다', () => {
      render(<Input leftIcon={<span>@</span>} />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('pl-10');
    });

    it('rightIcon이 있을 때 padding-right를 적용해야 한다', () => {
      render(<Input rightIcon={<span>✓</span>} />);
      const input = screen.getByRole('textbox');
      expect(input.className).toContain('pr-10');
    });
  });

  describe('접근성', () => {
    it('error가 있을 때 aria-invalid를 true로 설정해야 한다', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('error가 없을 때 aria-invalid를 false로 설정해야 한다', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('label과 input이 올바르게 연결되어야 한다', () => {
      render(<Input label="Email" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', input.id);
    });
  });
});
