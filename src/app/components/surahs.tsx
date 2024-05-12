"use client"

import { fetchSurahs } from "@/lib/api";
import type { Surah } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SurahsGrid() {
  const [surahList, setSurahList] = useState<Surah[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchSurahs();
        if (response && response.data) {
          setSurahList(response.data);
        }
      } catch (error) {
        console.error("Error fetching surah:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="w-[80%] grid grid-cols-3 gap-4 p-4">
      {surahList.map((surah) => (
        <Link key={surah.nomor} href={`/quran/${surah.nomor}`}>
          <div className="p-4 border rounded-md text-right bg-slate-100 dark:bg-slate-950 hover:bg-[url('/hero.png')] hover:bg-center hover:bg-cover hover:text-white">
            <h2 className="text-xl font-semibold">{surah.nama}</h2>
            <p className="">{surah.namaLatin} | {surah.arti}</p>
            <p>{surah.jumlahAyat} Ayahs</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
