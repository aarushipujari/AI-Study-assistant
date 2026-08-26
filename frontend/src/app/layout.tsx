import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'VaultX Study Assistant Pro ⚡',
  description: 'Next-Gen RAG Study Suite for Medical (MBBS) & Engineering Students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#060813] text-[#F8FAFC]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
