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
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
