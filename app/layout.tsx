import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import EditorShell from '@/components/EditorShell';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ghifari Arsa Ranandya — AI Engineer & Researcher',
  description:
    'Personal portfolio of Ghifari Arsa Ranandya, an AI engineer and researcher building RAG and LLM systems. Navigable with vim motions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <EditorShell>{children}</EditorShell>
      </body>
    </html>
  );
}
