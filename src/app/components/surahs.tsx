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
          <div className="p-4 border rounded-md text-right bg-primary-background hover:bg-gradient-to-tr hover:from-pink-100 hover:to-cyan-100">
            <h2 className="text-xl font-semibold">{surah.nama}</h2>
            <p className="text-gray-600">{surah.namaLatin} | {surah.arti}</p>
            <p>{surah.jumlahAyat} Ayahs</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
