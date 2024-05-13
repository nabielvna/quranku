import { SurahsGrid } from "../components/surahs";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col p-3 md:p-10 items-center">
      <div className="w-[70%] h-[100px] flex flex-col items-center justify-center bg-[url('/hero.png')] bg-bottom bg-cover rounded-lg">
        <span className="text-5xl md:text-6xl font-bold text-white">QURANKU</span>
      </div>
      <div className="w-full flex flex-col items-center">
        <SurahsGrid/>
      </div>
    </main>
  )
}
