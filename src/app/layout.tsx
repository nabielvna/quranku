import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quranku",
  description: "Quranku - Easy Al-Quran webapp for all people",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="sticky top-0 w-full bg-white dark:bg-slate-950 shadow-md z-10">
            <div className="w-full mx-auto px-8">
              <div className="flex items-center justify-between h-16">
                <div>
                  <Image width={40} height={40} src="/logo.jpg" alt="Logo" />
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <span className="text-4xl font-bold">Qur&apos;anKu</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-auto flex items-center  space-x-6 font-semibold"> 
                    <Link href="/quran">Al Quran</Link>
                    <Link href="/list">Surah List</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <div><ModeToggle /></div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
