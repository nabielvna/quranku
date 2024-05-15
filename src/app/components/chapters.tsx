"use client"

import { useEffect, useState,  useRef } from "react";
import Link from "next/link";
import { fetchChapters, fetchJuzs } from "@/lib/api";
import type { Chapter, Juz } from "@/types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TabsTriggerGroup from "./tabs-trigger";
import { convertLatinToArabic } from "@/utils/number-dict";

interface SurahsGridProps {
  limit?: {
    smallScreen?: number;
    mediumScreen?: number;
    largeScreen?: number;
  };
  isSearchEnabled: boolean;
}

export function ChaptersGrid({ limit, isSearchEnabled }: SurahsGridProps) {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [juzList, setJuzList] = useState<Juz[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [randomChapterIndices, setRandomChapterIndices] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });
  const [hoveredChapterId, setHoveredChapterId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("chapter");
  const [selectedJuzId, setSelectedJuzId] = useState<number | null>(null);
  const juzRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chapters, juzs] = await Promise.all([fetchChapters(), fetchJuzs()]);
        if (chapters) {
          setChapterList(chapters);
          setFilteredChapters(chapters);
        }
        if (juzs) {
          setJuzList(juzs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
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

  useEffect(() => {
    const filtered = chapterList.filter((chapter) =>
      chapter.name_complex.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.id.toLocaleString().includes(searchQuery) ||
      chapter.name_arabic.includes(searchQuery)
    );
    setFilteredChapters(filtered);
  }, [searchQuery, chapterList]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (juzRef.current && !juzRef.current.contains(event.target as Node)) {
        setSelectedJuzId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedJuzId]);

  const handleJuzClick = (juzId: number) => {
    setSelectedJuzId(juzId);
  };

  const displayedChapters = limit ? randomChapterIndices.map((index) => chapterList[index]) : filteredChapters;

  const renderChapters = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
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
                    <p className="text-sm font-semibold">{chapter.name_complex}</p>
                    <p className="text-xs">{chapter.translated_name.name}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end text-end flex-grow-0 w-auto">
                  <p className="font-bold text-sm">{chapter.name_arabic}</p>
                  <p className="text-xs">{chapter.verses_count} Verses</p>
                </div>
              </div>
            </Link>
          </HoverCardTrigger>
          {hoveredChapterId === chapter.id && (
            <HoverCardContent className="w-fit">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="font-bold text-xs">{chapter.name_simple}</p>
                  <Separator className="mb-1 mt-2"/>
                  <p className="font-bold text-xs">Revelation</p>
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
                    <span>Pages:</span>{" "}
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
    </div>
  );

  const renderJuzs = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
        {error && <p className="text-red-500">{error}</p>}
        {juzList.map((juz) => (
          <div key={juz.id} ref={juzRef}>
            <div
              className="flex flex-col border-2 space-y-2 rounded-sm p-3 hover:border-teal-300 hover:shadow-teal-300 hover:shadow-xs hover:cursor-pointer"
              onClick={() => handleJuzClick(juz.id)}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col justify-center mx-3">
                    <p className="font-bold">{juz.juz_number}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-semibold">Juz {juz.juz_number}</p>
                    <p className="text-xs">{juz.verses_count} verses</p>
                  </div>
                </div>
              </div>
              {selectedJuzId === juz.id && (
                <div className="flex flex-col space-y-2 bg-slate-100 dark:bg-slate-900 rounded-sm p-3">
                  {Object.entries(juz.verse_mapping).map(([chapterId, verses]) => {
                    const chapter = chapterList.find((chapter) => chapter.id === parseInt(chapterId));
                    if (!chapter) return null;
  
                    return (
                      <Link key={chapterId} href={`/quran/${chapterId}`}>
                        <div className="flex flex-col border-2 hover:border-teal-300 bg-slate-200 dark:bg-slate-800 rounded-sm py-2 px-4 capitalize text-xs">
                          <div className="flex flex-row justify-between space-x-3 font-semibold">
                            <span>{verses}</span>
                            <span>{convertLatinToArabic(chapterId)} {chapter.name_arabic}</span>
                          </div>
                          <div className="flex flex-row justify-between ">
                            <span>{chapter.translated_name.name}</span>
                            <span>{chapter.name_complex}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full md:w-[85%] lg:w-[75%] pb-10">
      {isSearchEnabled && (
        <div className="px-4 w-full flex justify-between">
          <div className="relative w-[45%] flex space-x-3">
            <Input
              className="border-2"
              placeholder="Search chapter"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2"/>
          </div>
          <TabsTriggerGroup selectedTab={selectedTab} onTabChange={(selectedTab) => setSelectedTab(selectedTab)} />
        </div>
      )}
      {isSearchEnabled && (
        <p className="px-5 my-3 text-xs font-semibold text-gray-500">{filteredChapters.length} result{filteredChapters.length !== 1 ? "s" : ""} found</p>
      )}
      <div className={`w-full`}>
        {selectedTab === 'chapter' ? renderChapters() : renderJuzs()}
      </div>
    </main>
  );
}
