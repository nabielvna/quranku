"use client"

import { useEffect, useState } from "react";
import { fetchSurah } from "@/lib/api";
import type { Surah } from "@/types/types";
import { AudioPlayerDropdown } from "./components/full-audio";
import { Separator } from "@/components/ui/separator";
import ViewOption from './components/view-option';
import QuranAyah from "./components/ayah";

const Page = ({ params }: { params: { nomor: string } }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['Ayat']); 

  useEffect(() => {
    const fetchSurahData = async () => {
      const response = await fetchSurah(params.nomor);
      if (response && response.data) {
        const data: Surah[] = Array.isArray(response.data) ? response.data : [response.data];
        setSurahs(data);
      }
    };

    fetchSurahData(); 
  }, [params.nomor]); 

  const handleOptionChange = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    setSelectedOptions(isSelected ? selectedOptions.filter((item) => item !== option) : [...selectedOptions, option]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {surahs.map((surah) => (
          <div key={surah.nomor}>
            <div className="w-full pb-10 px-10">
              <div className="w-full flex my-10 flex-col items-center space-y-3">
                <p className="font-bold text-4xl">{surah.nama}</p>
                <div className="flex flex-col text-center items-center">
                  <p className="text-lg font-semibold">{surah.namaLatin}</p>
                  <p>{surah.arti}</p>
                </div>
              </div>
              <div className="relative w-full rounded-2xl border-2 border-solid p-4">
                <div className="absolute top-5 right-5">
                  <ViewOption options={['Ayat', 'Latin', 'Terjemah']} onSelectOption={handleOptionChange} selectedOption={selectedOptions} />
                </div>
                <p className="font-bold">{surah.jumlahAyat} Ayat</p>
                <p className="font-bold">Tempat Turun</p>
                <p>{surah.tempatTurun}</p>
                <p className="font-bold">Deskripsi</p>
                <p className="mb-5"><span dangerouslySetInnerHTML={{ __html: surah.deskripsi }} /></p>
                
                <AudioPlayerDropdown audioUrls={surah.audioFull} />
              </div>
            </div>

            <div className="px-10">
            {surah.ayat.map((ayah) => (
              <div key={ayah.nomorAyat}>
                {selectedOptions.includes('Ayat') && <QuranAyah ayah={ayah} selectedOption="Ayat" />} 
                {selectedOptions.includes('Latin') && <QuranAyah ayah={ayah} selectedOption="Latin" />}
                {selectedOptions.includes('Terjemah') && <QuranAyah ayah={ayah} selectedOption="Terjemah" />}
                <Separator />
              </div>
            ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
