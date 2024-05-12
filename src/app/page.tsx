import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SurahsGrid } from "./components/surahs";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="w-full h-[70vh] flex flex-col items-center justify-center relative text-white bg-[url('/hero.png')] bg-center bg-cover">
        <div className="text-center flex flex-col items-center justify-center space-y-2 w-[50%]">
          <span className="text-6xl font-bold">Quranku</span>
          <span className="text-2xl font-bold">An easy to use Al Quran website for all people especially <span className="font-bold">GEN Z</span></span>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-3">
            <Input className="bg-white-900 dark:bg-slate-700" placeholder="Mau cari apa bang"/>
            <Button className="bg-slate-300 dark:bg-blue-950 dark:hover:bg-slate-600 text-white py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"> 
              <Search size={18} strokeWidth={2.25} />
            </Button>
          </div>
        </div>
      </section>
      <div className="relative w-full flex flex-col items-center justify-center">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-[70%] h-[10vh] dark:bg-blue-950 bg-slate-100 rounded-2xl flex flex-col justify-center px-6">
          <div className="flex flex-row justify-between w-full px-8">
          </div>
        </div>
      </div>
      <section className="my-16">
        <div className="w-full flex flex-col items-center">
          <Link href={"/quran"} className="font-bold text-4xl my-2">Alquran</Link>
          <SurahsGrid limit={9}/>
        </div>
      </section>
    </main>
  );
}
