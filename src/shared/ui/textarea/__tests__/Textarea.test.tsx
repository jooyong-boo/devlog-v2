import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from '../Textarea';

describe('<Textarea />', () => {
  it('textarea를 렌더링해야 한다', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('label과 required 표시를 렌더링해야 한다', () => {
    render(<Textarea label="내용" required id="content" />);

    const label = screen.getByText('내용');
    expect(label).toBeInTheDocument();
    expect(label.parentElement).toHaveTextContent('*');
    expect(label).toHaveAttribute('for', 'content');
  });

  it('helperText를 표시하고 aria-describedby를 연결해야 한다', () => {
    render(<Textarea id="memo" helperText="도움말" />);

    const textarea = screen.getByRole('textbox');
    expect(screen.getByText('도움말')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-describedby', 'memo-helper');
    expect(textarea).toHaveAttribute('aria-invalid', 'false');
  });

  it('error가 있으면 helperText 대신 error를 우선 표시해야 한다', () => {
    render(<Textarea id="memo" helperText="도움말" error="필수 입력" />);

    const textarea = screen.getByRole('textbox');
    expect(screen.getByRole('alert')).toHaveTextContent('필수 입력');
    expect(screen.queryByText('도움말')).not.toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-describedby', 'memo-error');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('숫자 width/height style을 반영해야 한다', () => {
    render(<Textarea className="custom-textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea.className).toContain('custom-textarea');
    expect(textarea.className).toContain('border-gray-300');
  });
});
