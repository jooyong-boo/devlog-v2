import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '../Skeleton';

describe('<Skeleton />', () => {
  it('기본 variant와 animation 클래스를 적용해야 한다', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.className).toContain('rounded');
    expect(skeleton.className).toContain('animate-pulse');
  });

  it('circular variant와 wave animation을 적용해야 한다', () => {
    const { container } = render(
      <Skeleton variant="circular" animation="wave" />
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.className).toContain('rounded-full');
    expect(skeleton.className).toContain('animate-shimmer');
  });

  it('숫자 width/height를 px로 style에 반영해야 한다', () => {
    const { container } = render(<Skeleton width={120} height={24} />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('120px');
    expect(skeleton.style.height).toBe('24px');
  });

  it('문자열 width/height와 커스텀 className/style을 병합해야 한다', () => {
    const { container } = render(
      <Skeleton
        width="50%"
        height="2rem"
        className="custom-skeleton"
        style={{ opacity: 0.5 }}
      />
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('50%');
    expect(skeleton.style.height).toBe('2rem');
    expect(skeleton.style.opacity).toBe('0.5');
    expect(skeleton.className).toContain('custom-skeleton');
  });
});
