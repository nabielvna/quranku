"use client"

import { useEffect, useState } from 'react';
import { fetchVersesByPage, fetchQuranVersesUthmani } from '@/lib/api';
import type { Verse, VerseUthmani } from '@/types/types';


const Page = ({ params }: { params: { page: string } }) => {
  console.log(params);
  const [verses, setVerses] = useState<VerseUthmani[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const verseData = await fetchVersesByPage(params.page);
        const { verses } = verseData;
        
        const uthmaniVersesPromises = verses.map((verse: Verse) => fetchQuranVersesUthmani(verse.verse_key));
        const uthmaniVersesArrays = await Promise.all(uthmaniVersesPromises);
        const uthmaniVerses = uthmaniVersesArrays.flat();

        console.log(uthmaniVerses);

        setVerses(uthmaniVerses);
      } catch (error) {
        console.error('Error fetching verses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='w-[35%] bg-red-600 text-justify'>
        {verses.map((verse) => (
          <p className="text-2xl font-semibold" key={verse.id}> {verse.text_uthmani}</p>
        ))}
      </div>
    </div>
  );
};

export default Page;
