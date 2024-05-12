"use client"

import { fetchSurah } from "@/lib/api"
import type { Surah } from "@/types/types"
import { AudioPlayerDropdown } from "./components/full-audio";

export default async function Page({ params }: { params: { nomor: string } }) {
  const response = await fetchSurah(params.nomor)

  if (response && response.data) {
    const surahs: Surah[] = Array.isArray(response.data) ? response.data : [response.data];

    return (
      <div>
        {surahs.map((surah) => (
          <div key={surah.nomor}>
            <h1>{surah.nama}</h1>
            <p>{surah.namaLatin}</p>
            <p>{surah.jumlahAyat} Ayahs</p>
            <p>Tempat Turun: {surah.tempatTurun}</p>
            <p>Arti: {surah.arti}</p>
            <p>Deskripsi: {surah.deskripsi}</p>

            <h2>Full Audio</h2>
            <AudioPlayerDropdown audioUrls={surah.audioFull} />

            <h2>Ayat</h2>
            {surah.ayat.map((ayah) => (
              <div key={ayah.nomorAyat}>
                <span>{ayah.teksArab}</span>
                <span>{ayah.nomorAyat}</span>
                <span>{ayah.teksIndonesia}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  } else {
    return <div>No data available</div>;
  }
}
