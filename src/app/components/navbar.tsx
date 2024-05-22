"use client"

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-slate-950 shadow-md z-10"> 
      <div className="w-full mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <Image width={40} height={40} src="/logo.svg" className="dark:hidden" alt="Logo" />
            <Image width={40} height={40} src="/logo-dark.svg" className="hidden dark:block" alt="Logo" />
          </div>
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-4xl font-bold">Qur&apos;anKu</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-auto flex items-center space-x-6 font-semibold"> 
              <Link href="/quran">Al Quran</Link>
              <Link href="/about">About</Link>
              <div><ModeToggle /></div>
            </div>
          </div>
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger><Menu size={20} strokeWidth={1.5} /></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex flex-row space-y-3 justify-center items-center">
                    QURANKU
                    <div>
                      <ModeToggle/>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-2">
                  <Link className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300 ease-in-out" href="/quran">
                      Al Quran
                  </Link>
                  <Separator/>
                  <Link className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300 ease-in-out" href="/about">
                    About
                  </Link>
                  <Separator/>
                  <Link className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300 ease-in-out" href="/contact">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
