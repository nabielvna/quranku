"use client"

import { fetchSurahs } from "@/lib/api";
import type { Surah } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SurahsGridProps {
  limit?: number;
}

export function SurahsGrid({ limit }: SurahsGridProps) {
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [randomSurahIndices, setRandomSurahIndices] = useState<number[]>([]);

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

  useEffect(() => {
    if (surahList.length > 0 && limit) {
      const randomIndices: number[] = [];
      while (randomIndices.length < limit) {
        const randomIndex = Math.floor(Math.random() * surahList.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      setRandomSurahIndices(randomIndices);
    }
  }, [surahList, limit]);

  const displayedSurahs = limit
    ? randomSurahIndices.map((index) => surahList[index])
    : surahList;

  return (
    <main className="w-[80%] grid grid-cols-3 gap-4 p-4">
      {displayedSurahs.map((surah) => (
        <Link key={surah.nomor} href={`/quran/${surah.nomor}`}>
          <div className="p-3 border-4 rounded-xl text-right bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 hover:bg-slate-800 hover:bg-center hover:bg-cover hover:text-white">
            <h2 className="text-xl font-semibold">{surah.nama}</h2>
            <p className="">{surah.namaLatin} | {surah.arti}</p>
            <p>{surah.jumlahAyat} Ayahs</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
