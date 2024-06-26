import { ChaptersGrid } from "./components/chapters";
import Link from "next/link";
import { RandomVerse } from "./components/random-verse";
import { UserLocation } from "./components/location-time";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="w-full h-[70vh] flex flex-col items-center justify-center relative text-white bg-[url('/hero.png')] bg-center bg-cover">
        <div className="absolute top-0 right-0">
          <UserLocation/>
        </div>
        <div className="text-center flex flex-col items-center justify-center space-y-2 w-[80%] md:w-[50%]">
          <span className="text-6xl font-bold">Quranku</span>
          <span className="text-md font-bold">An easy to use Al Quran website for all people especially <span className="font-bold text-red-500">GEN Z</span></span>
        </div>
        <div className="text-center flex flex-col items-center justify-center space-y-2 w-[70%]">
          <RandomVerse/>
        </div>
      </section>
      <section className="my-16">
        <div className="w-full flex flex-col items-center">
           <p className="font-bold text-4xl">Alquran</p>
           <div className="w-full md:w-[85%] lg:w-[75%] px-4 text-end my-3">
            <Link className="w-fit h-fit pb-1 px-3 font-semibold bg-teal-400 hover:bg-teal-500 text-white rounded leading-none" href="/quran">see more</Link>
           </div>
          <ChaptersGrid limit={{ smallScreen: 3, mediumScreen: 6, largeScreen: 9 }} isSearchEnabled={false} />
        </div>
      </section>
    </main>
  );
}
