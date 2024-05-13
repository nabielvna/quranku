"use client"

import { useEffect, useState } from "react";
import { fetchChapters, fetchVersesByChapter, fetchQuranVersesUthmani } from "@/lib/api";
import type { Chapter, VerseUthmani, VersesByChapter } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import ViewOption from './components/view-option';
import QuranVerse from "./components/verse";

const convertVersesToUthmani = (verses: any[]): VerseUthmani[] => {
  return verses.map((verse) => ({
    id: verse.id,
    verse_key: verse.verse_key,
    text_uthmani: "", 
  }));
};

const Page = ({ params }: { params: { nomor: string } }) => {
  // State variables
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [versesUthmani, setVersesUthmani] = useState<VerseUthmani[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['Ayat']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapters = await fetchChapters();
        const currentChapter = chapters.find((chapter: Chapter) => chapter.id === parseInt(params.nomor));
        setChapter(currentChapter || null);

        if (currentChapter) {
          const firstPageData: VersesByChapter = await fetchVersesByChapter(params.nomor, 1, 50);
          const totalPages = firstPageData.pagination.total_pages;

          const allVerses: VerseUthmani[] = [];
          for (let i = 1; i <= totalPages; i++) {
            const pageData: VersesByChapter = await fetchVersesByChapter(params.nomor, i, 50);
            const convertedVerses = convertVersesToUthmani(pageData.verses);
            
            const promises = convertedVerses.map((verse) => fetchQuranVersesUthmani(verse.verse_key));
            const uthmaniVerses = await Promise.all(promises);
            allVerses.push(...uthmaniVerses.flat());
            
            setVersesUthmani(allVerses);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.nomor]);

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
                <p className="font-bold text-4xl">{chapter.name_arabic}</p>
                <div className="flex flex-col text-center items-center">
                  <p className="text-lg font-semibold">{chapter.name_complex}</p>
                  <p>{chapter.translated_name.name}</p>
                </div>
              </div>
              <div className="relative w-full rounded-2xl border-2 border-solid p-4">
                <div className="absolute top-5 right-5">
                  <ViewOption options={['Ayat', 'Latin', 'Terjemah']} onSelectOption={handleOptionChange} selectedOption={selectedOptions} />
                </div>
                <p className="font-bold">{chapter.verses_count} Ayat</p>
                <p className="font-bold">Tempat Turun</p>
                <p>{chapter.revelation_place}</p>
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
