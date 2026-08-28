import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MasjidGuard - Masjid Transparency App | مسجد شفافیت',
  description:
    'Masjidon ki financial transparency, donation management, aur volunteer system. Har masjid ki aamdani, kharch, staff salary, aur property ki mukammal jankari.',
  keywords: [
    'masjid',
    'mosque',
    'transparency',
    'donation',
    'waqf',
    'imam',
    'muazzin',
    'volunteer',
    'islamic',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
