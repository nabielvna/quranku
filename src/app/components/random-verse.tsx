"use client"

import { useEffect, useState, useRef } from "react";
import { fetchRandomVerse, fetchQuranVersesUthmani, fetchQuranTranslation } from "@/lib/api";
import { Translation, Verse, VerseUthmani } from "@/types/types";
import { convertLatinToArabic } from "@/utils/number-dict";

export function RandomVerse() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [uthmaniVerses, setUthmaniVerses] = useState<VerseUthmani[]>([]);
  const [translation, setTranslation] = useState<Translation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef<boolean>(false);

  const fetchVerse = async () => {
    if (fetchingRef.current) return; // Prevent multiple fetches
    fetchingRef.current = true;

    try {
      const randomVerse = await fetchRandomVerse();
      setVerse(randomVerse);
      if (randomVerse && randomVerse.verse_key) {
        localStorage.setItem('randomVerse', JSON.stringify(randomVerse));
        localStorage.setItem('lastFetchedTime', new Date().toISOString());

        const fetchedUthmaniVerses = await fetchQuranVersesUthmani(randomVerse.verse_key);
        setUthmaniVerses(fetchedUthmaniVerses);

        const translations = await fetchQuranTranslation(randomVerse.verse_key, 85);
        setTranslation(translations);
      }
    } catch (error) {
      console.error("Error fetching random verse:", error);
      setError("Failed to fetch verse. Please try again later.");
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    const savedVerse = localStorage.getItem('randomVerse');
    const lastFetchedTime = localStorage.getItem('lastFetchedTime');

    const now = new Date();

    if (savedVerse && lastFetchedTime) {
      const lastFetchedDate = new Date(lastFetchedTime);

      if (now.getTime() - lastFetchedDate.getTime() < 3600000) {
        const storedVerse = JSON.parse(savedVerse);
        setVerse(storedVerse);
        fetchQuranVersesUthmani(storedVerse.verse_key).then(setUthmaniVerses);
        fetchQuranTranslation(storedVerse.verse_key, 85).then(setTranslation);
      } else {
        fetchVerse();
      }

      const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
          fetchVerse();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      fetchVerse();
    }
  }, []);

  const getArabicVerseKey = (number: string) => {
    return convertLatinToArabic(number);
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-500">{error}</p>}
      {verse ? (
        <div className="w-full my-10">
          {uthmaniVerses.length > 0 ? (
            <ul>
              {uthmaniVerses.map((uthmaniVerse, index) => (
                <li className="font-bold text-sm space-y-3" key={index}>
                  <p className="hidden md:block">
                    {uthmaniVerse.text_uthmani} - {getArabicVerseKey(verse.verse_key)}
                  </p>
                  <p>
                    {translation.length > 0 && <p>{translation[0].text} - {verse.verse_key}</p>}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-bold text-sm">No Uthmani verses found.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}