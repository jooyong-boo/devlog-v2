import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('<Card />', () => {
  describe('렌더링', () => {
    it('children을 렌더링해야 한다', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  describe('variant 스타일', () => {
    it('default variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Card variant="default">Default</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('bg-white');
    });

    it('bordered variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Card variant="bordered">Bordered</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('border');
    });

    it('elevated variant 클래스를 적용해야 한다', () => {
      const { container } = render(<Card variant="elevated">Elevated</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('shadow');
    });
  });

  describe('padding 스타일', () => {
    it('none padding 클래스를 적용해야 한다', () => {
      const { container } = render(<Card padding="none">No padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toMatch(/p-\d/);
    });

    it('sm padding 클래스를 적용해야 한다', () => {
      const { container } = render(<Card padding="sm">Small padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('p-3');
    });

    it('md padding 클래스를 적용해야 한다 (기본값)', () => {
      const { container } = render(<Card>Default padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('p-4');
    });

    it('lg padding 클래스를 적용해야 한다', () => {
      const { container } = render(<Card padding="lg">Large padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('p-6');
    });
  });

  describe('hoverable', () => {
    it('hoverable prop이 true일 때 hover 클래스를 적용해야 한다', () => {
      const { container } = render(<Card hoverable>Hoverable</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('cursor-pointer');
      expect(card.className).toContain('hover:shadow-lg');
    });

    it('hoverable prop이 false일 때는 hover 클래스가 없어야 한다', () => {
      const { container } = render(
        <Card hoverable={false}>Not hoverable</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toContain('cursor-pointer');
    });
  });

  describe('커스텀 className', () => {
    it('추가 className을 병합해야 한다', () => {
      const { container } = render(
        <Card className="custom-class">Custom</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
      // Should still have base classes
      expect(card.className).toContain('rounded-lg');
    });
  });

  describe('조합 테스트', () => {
    it('여러 props를 동시에 적용할 수 있어야 한다', () => {
      const { container } = render(
        <Card variant="bordered" padding="lg" hoverable className="custom">
          Combined props
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('border');
      expect(card.className).toContain('p-6');
      expect(card.className).toContain('cursor-pointer');
      expect(card.className).toContain('custom');
    });
  });
});
