"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchChapters } from "@/lib/api";
import type { Chapter } from "@/types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

interface SurahsGridProps {
  limit?: {
    smallScreen?: number;
    mediumScreen?: number;
    largeScreen?: number;
  };
}

export function SurahsGrid({ limit }: SurahsGridProps) {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [randomChapterIndices, setRandomChapterIndices] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });
  const [hoveredChapterId, setHoveredChapterId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchChapters();
        if (response) {
          setChapterList(response);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setError("Failed to fetch chapters. Please try again later.");
      }
    };

    fetchData();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (chapterList.length > 0 && limit) {
      const randomIndices: number[] = [];
      let currentLimit: number;

      if (screenWidth >= 1024) {
        currentLimit = limit.largeScreen || chapterList.length;
      } else if (screenWidth >= 768) {
        currentLimit = limit.mediumScreen || limit.largeScreen || chapterList.length;
      } else {
        currentLimit = limit.smallScreen || limit.mediumScreen || limit.largeScreen || chapterList.length;
      }

      while (randomIndices.length < currentLimit) {
        const randomIndex = Math.floor(Math.random() * chapterList.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }
      setRandomChapterIndices(randomIndices);
    }
  }, [chapterList, limit, screenWidth]);

  const displayedChapters = limit ? randomChapterIndices.map((index) => chapterList[index]) : chapterList;

  return (
    <main className="w-full md:w-[85%] lg:w-[75%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
      {error && <p className="text-red-500">{error}</p>}
      {displayedChapters.map((chapter) => (
        <HoverCard key={chapter.id}>
          <HoverCardTrigger
            onMouseEnter={() => setHoveredChapterId(chapter.id)}
            onMouseLeave={() => setHoveredChapterId(null)}
          >
            <Link key={chapter.id} href={`/quran/${chapter.id}`}>
              <div className="border-2 rounded-sm flex flex-row justify-between items-center p-3 hover:border-teal-300 hover:shadow-teal-300 hover:shadow-xs">
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col justify-center mx-3">
                    <p className="font-bold">{Number(chapter.id).toLocaleString('ar-EG')}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold">{chapter.name_complex}</p>
                    <p className="text-xs">{chapter.translated_name.name}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end text-end flex-grow-0 w-auto">
                  <p className="font-bold text-sm">{chapter.name_arabic}</p>
                  <p className="text-xs">{chapter.verses_count} Ayat</p>
                </div>
              </div>
            </Link>
          </HoverCardTrigger>
          {hoveredChapterId === chapter.id && (
            <HoverCardContent className="w-fit">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p  className="font-bold text-xs">Revelation</p>
                  <div className="flex flex-row justify-between capitalize font-semibold text-xs space-x-10">
                    <span>Place:</span>
                    <span>{chapter.revelation_place}</span>
                  </div>
                  <div className="flex flex-row justify-between capitalize font-semibold text-xs">
                    <span>Order:</span>
                    <span>{chapter.revelation_order}</span>
                  </div>
                </div>
                <Separator className="mb-1 mt-2"/>
                {chapter.pages.length > 0 && (
                  <p className="flex flex-row justify-between font-semibold text-xs">
                    <span >Pages:</span>{" "}
                    {chapter.pages.reduce((acc: (number | string)[], page) => {
                      if (!acc.includes(page)) {
                        acc.push(page);
                      }
                      return acc;
                    }, []).join(' - ')}
                  </p>
                )}
              </div>
            </HoverCardContent>
          )}
        </HoverCard>
      ))}
    </main>
  );
}
