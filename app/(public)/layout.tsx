import { Suspense } from 'react';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';
import { SessionProvider } from '@/shared/ui/providers/SessionProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Suspense
        fallback={
          <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80" />
        }
      >
        <Header />
      </Suspense>
      <main className="min-h-screen">{children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </SessionProvider>
  );
}
