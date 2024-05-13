"use client"

import { fetchSurahs } from "@/lib/api";
import type { Surah } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SurahsGridProps {
  limit?: {
    smallScreen?: number;
    mediumScreen?: number;
    largeScreen?: number;
  };
}

export function SurahsGrid({ limit }: SurahsGridProps) {
  const [surahList, setSurahList] = useState<Surah[]>([]);
  const [randomSurahIndices, setRandomSurahIndices] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSurahs();
        if (response && response.data) {
          setSurahList(response.data);
        }
      } catch (error) {
        console.error("Error fetching surah:", error);
      }
    };

    fetchData();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (surahList.length > 0 && limit) {
      const randomIndices: number[] = [];
      let currentLimit: number;

      if (screenWidth >= 1024) {
        currentLimit = limit.largeScreen || surahList.length;
      } else if (screenWidth >= 768) {
        currentLimit = limit.mediumScreen || limit.largeScreen || surahList.length;
      } else {
        currentLimit = limit.smallScreen || limit.mediumScreen || limit.largeScreen || surahList.length;
      }

      while (randomIndices.length < currentLimit) {
        const randomIndex = Math.floor(Math.random() * surahList.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      setRandomSurahIndices(randomIndices);
    }
  }, [surahList, limit, screenWidth]);

  const displayedSurahs = limit ? randomSurahIndices.map((index) => surahList[index]) : surahList;

  return (
    <main className="w-full md:w-[85%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
      {displayedSurahs.map((surah) => (
        <Link key={surah.nomor} href={`/quran/${surah.nomor}`}>
          <div className="border-2 rounded-sm flex flex-row justify-between items-center p-3 hover:border-teal-300 hover:shadow-teal-300 hover:shadow-xs">
            <div className="flex flex-row gap-3">
              <div className="flex flex-col justify-center mx-3">
                <p className="font-bold">{`${surah.nomor.toLocaleString('ar-EG')}`}</p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold">{surah.namaLatin}</p>
                <p className="text-xs">{surah.arti}</p>
              </div>
            </div>
            <div className="flex flex-col justify-end text-end flex-grow-0 w-auto">
              <p className="font-bold text-sm">{surah.nama}</p>
              <p className="text-xs">{surah.jumlahAyat} Ayat</p>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}