"use client";

import { useEffect, useState, useRef } from "react";
import { fetchChapters, fetchJuzs } from "@/lib/api";
import type { Chapter, Juz } from "@/types/types";
import ChapterCard from "./chapter-card";
import JuzCard from "./juz-card";
import SearchAndTabs from "./search-tabs";

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
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          hoveredChapterId={hoveredChapterId}
          setHoveredChapterId={setHoveredChapterId}
        />
      ))}
    </div>
  );

  const renderJuzs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
      {error && <p className="text-red-500">{error}</p>}
      {juzList.map((juz) => (
        <JuzCard
          key={juz.id}
          juz={juz}
          chapterList={chapterList}
          selectedJuzId={selectedJuzId}
          handleJuzClick={handleJuzClick}
          juzRef={juzRef} // Pass the juzRef here
        />
      ))}
    </div>
  );

  return (
    <main className="w-full md:w-[85%] lg:w-[75%] pb-10">
      {isSearchEnabled && (
        <SearchAndTabs
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
      {isSearchEnabled && (
        <p className="px-5 my-3 text-xs font-semibold text-gray-500">
          {filteredChapters.length} result{filteredChapters.length !== 1 ? "s" : ""} found
        </p>
      )}
      <div className={`w-full`}>
        {selectedTab === 'chapter' ? renderChapters() : renderJuzs()}
      </div>
    </main>
  );
}