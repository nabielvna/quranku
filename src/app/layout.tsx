import type { Metadata } from "next";
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quranku",
  description: "Quranku - Easy Al-Quran webapp for all people",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
          fontSans.className,
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute right-3 top-3">
              <ModeToggle/>
            </div>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
