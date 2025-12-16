import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevStage - Interactive Component Testing',
  description: 'Build, test, and showcase your components interactively',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
