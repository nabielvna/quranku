import { ChaptersGrid } from "../components/chapters";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center">
      <div className="w-[100%] h-[300px] flex flex-col items-center justify-center bg-[url('/hero.png')] bg-center bg-cover">
        <span className="text-5xl md:text-6xl font-bold text-white">QURANKU</span>
      </div>
      <div className="w-full flex flex-col items-center mt-5">
        <ChaptersGrid isSearchEnabled={true}/>
      </div>
    </main>
  )
}
