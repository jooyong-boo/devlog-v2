import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('<Pagination />', () => {
  it('totalPages가 1 이하이면 렌더링하지 않아야 한다', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('페이지 버튼과 이전/다음 버튼을 렌더링해야 한다', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('첫 페이지에서는 이전 버튼이 비활성화되어야 한다', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '이전' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '다음' })).not.toBeDisabled();
  });

  it('마지막 페이지에서는 다음 버튼이 비활성화되어야 한다', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '다음' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '이전' })).not.toBeDisabled();
  });

  it('현재 페이지를 클릭할 수 없어야 한다', () => {
    render(
      <Pagination currentPage={3} totalPages={7} onPageChange={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: '3' })).toBeDisabled();
  });

  it('페이지 이동 이벤트를 호출해야 한다', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={7} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: '이전' }));
    fireEvent.click(screen.getByRole('button', { name: '다음' }));
    fireEvent.click(screen.getByRole('button', { name: '5' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 5);
  });

  it('중간 구간에서는 ellipsis를 표시해야 한다', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        maxVisible={5}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
  });
});
