import { ChaptersGrid } from "./components/chapters";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="w-full h-[70vh] flex flex-col items-center justify-center relative text-white bg-[url('/hero.png')] bg-center bg-cover">
        <div className="text-center flex flex-col items-center justify-center space-y-2 w-[50%]">
          <span className="text-6xl font-bold">Quranku</span>
          <span className="text-2xl font-bold">An easy to use Al Quran website for all people especially <span className="font-bold text-red-500">GEN Z</span></span>
        </div>
      </section>
      <div className="relative w-full mb-10">
        <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-[40%] w-[60%] h-[10vh] rounded-full bg-white dark:bg-[#353969]">
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-[51.2%] -translate-y-[20%] w-[60%] h-[10vh] rounded-full bg-[#353969] dark:bg-[#292d56]">
        </div>
      </div>
      <section className="my-16">
        <div className="w-full flex flex-col items-center">
           <p className="font-bold text-4xl my-2">Alquran</p>
           <div className="w-full md:w-[85%] lg:w-[75%] px-4 text-end">
            <Link className="w-fit h-fit pb-1 px-3 font-semibold bg-teal-400 hover:bg-teal-500 text-white rounded leading-none" href="/quran">see more</Link>
           </div>
          <ChaptersGrid limit={{ smallScreen: 3, mediumScreen: 6, largeScreen: 9 }} isSearchEnabled={false} />
        </div>
      </section>
    </main>
  );
}
