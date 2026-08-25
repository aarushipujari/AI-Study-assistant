import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Study Assistant Pro ⚡',
  description: 'Full-Stack RAG Study Suite — Exam Simulation, Flashcard Decks, Oral Viva & Grounded AI Chat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0B0F19] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
