import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "./components/navbar";

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
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <footer className="w-full py-4 bg-gray-200 dark:bg-slate-800 text-center">
            <p>&copy; {new Date().getFullYear()} Lucky Strike Team. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
