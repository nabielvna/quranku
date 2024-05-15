"use client"

import { useEffect, useState } from "react";
import { fetchChapters, fetchVersesByChapter, fetchQuranVersesUthmani } from "@/lib/api";
import type { Chapter, VerseUthmani, VersesByChapter } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import ViewOption from './components/view-option';
import QuranVerse from "./components/verse";
import ChapterInfoComponent from "./components/chapter-info";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const convertVersesToUthmani = (verses: any[]): VerseUthmani[] => {
  return verses.map((verse) => ({
    id: verse.id,
    verse_key: verse.verse_key,
    text_uthmani: "", 
  }));
};

const Page = ({ params }: { params: { number: string } }) => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [versesUthmani, setVersesUthmani] = useState<VerseUthmani[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['']);

  const chapterNumber = parseInt(params.number);
  const previousChapter = chapterNumber - 1;
  const nextChapter = chapterNumber + 1;
  const prevDisabled = chapterNumber < 2;
  const nextDisabled = chapterNumber > 113;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapters = await fetchChapters();
        const currentChapter = chapters.find((chapter: Chapter) => chapter.id === parseInt(params.number));
        setChapter(currentChapter || null);

        if (currentChapter) {
          const firstPageData: VersesByChapter = await fetchVersesByChapter(params.number, 1, 50);
          const totalPages = firstPageData.pagination.total_pages;

          let allVerses: any[] = [];
          for (let i = 1; i <= totalPages; i++) {
            const pageData: VersesByChapter = await fetchVersesByChapter(params.number, i, 50);
            allVerses = allVerses.concat(pageData.verses);
          }

          const convertedVerses = convertVersesToUthmani(allVerses);
          const promises = convertedVerses.map((verse) => fetchQuranVersesUthmani(verse.verse_key));
          const uthmaniVerses = await Promise.all(promises);
          setVersesUthmani(uthmaniVerses.flat());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.number]);

  const handleOptionChange = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    setSelectedOptions(isSelected ? selectedOptions.filter((item) => item !== option) : [...selectedOptions, option]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {chapter && (
          <div>
            <div className="w-full pb-10 px-10">
              <div className="w-full flex my-10 flex-col items-center space-y-3">
                <div className="flex items-center space-x-3">
                  <Link className={prevDisabled ? 'hidden' : ''}  href={`/quran/${previousChapter}`}><ChevronLeft size={32} /></Link>
                  <ChevronLeft className={prevDisabled ? '' : 'hidden'} size={32} />
                  <p className="font-bold text-4xl">{chapter.name_arabic}</p>
                  <ChevronRight className={nextDisabled ? '' : 'hidden'} size={32} />
                  <Link className={nextDisabled ? 'hidden' : ''} href={`/quran/${nextChapter}`}><ChevronRight size={32}/></Link>
                </div>
                <div className="flex flex-col text-center items-center">
                  <p className="text-lg font-semibold">{chapter.name_complex}</p>
                  <p>{chapter.translated_name.name}</p>
                </div>
              </div>
              <div className="relative w-full rounded-2xl border-2 border-solid p-4">
                <div className="absolute top-5 right-5">
                  <ViewOption options={['Latin', 'Translation']} onSelectOption={handleOptionChange} selectedOption={selectedOptions} />
                </div>
                <p className="font-bold">{chapter.verses_count} Verses</p>
                <p className="font-bold">Revelation place</p>
                <p>{chapter.revelation_place}</p>
                <p className="font-bold">Info</p>
                <ChapterInfoComponent id={parseInt(params.number)}/>
              </div>
            </div>

            <div className="px-10">
              {versesUthmani.map((verseUthmani) => (
                <div key={verseUthmani.verse_key}>
                  <QuranVerse verse={verseUthmani} selectedOptions={selectedOptions} />
                  <Separator />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
