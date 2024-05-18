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
  const [filteredJuzs, setFilteredJuzs] = useState<Juz[]>([]);
  const [randomChapterIndices, setRandomChapterIndices] = useState<number[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("chapter");
  const [selectedJuzId, setSelectedJuzId] = useState<number | null>(null);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false); // Add this line
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
          setFilteredJuzs(juzs);
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
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    const filteredChapters = chapterList.filter((chapter) =>
      chapter.name_complex.toLowerCase().includes(lowerCaseSearchQuery) ||
      chapter.translated_name.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      chapter.name_simple.toLowerCase().includes(lowerCaseSearchQuery) ||
      chapter.id.toLocaleString().includes(lowerCaseSearchQuery) ||
      chapter.name_arabic.includes(searchQuery)
    );
    setFilteredChapters(filteredChapters);

    const filteredJuzs = juzList.filter((juz) =>
      juz.juz_number.toString().includes(lowerCaseSearchQuery) ||  // Added this line for filtering by Juz number
      Object.entries(juz.verse_mapping).some(([chapterId]) => {
        const chapter = chapterList.find((ch) => ch.id === parseInt(chapterId));
        return chapter && (
          chapter.name_complex.toLowerCase().includes(lowerCaseSearchQuery) ||
          chapter.translated_name.name.toLowerCase().includes(lowerCaseSearchQuery) ||
          chapter.name_simple.toLowerCase().includes(lowerCaseSearchQuery) ||
          chapter.id.toLocaleString().includes(lowerCaseSearchQuery) ||
          chapter.name_arabic.includes(searchQuery)
        );
      })
    );
    setFilteredJuzs(filteredJuzs);
    setIsSearchActive(!!searchQuery); // Update this line
  }, [searchQuery, chapterList, juzList]);

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
          chapter={chapter}/>
      ))}
    </div>
  );

  const renderJuzs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4">
      {error && <p className="text-red-500">{error}</p>}
      {filteredJuzs.map((juz) => (
        <JuzCard
          key={juz.id}
          juz={juz}
          chapterList={chapterList}
          selectedJuzId={isSearchActive ? juz.id : selectedJuzId} 
          handleJuzClick={handleJuzClick}
          juzRef={juzRef}
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
          {selectedTab === 'chapter' ? filteredChapters.length : filteredJuzs.length} result
          {selectedTab === 'chapter' ? filteredChapters.length !== 1 : filteredJuzs.length !== 1 ? "s" : ""} found
        </p>
      )}
      <div className={`w-full`}>
        {selectedTab === 'chapter' ? renderChapters() : renderJuzs()}
      </div>
    </main>
  );
}
