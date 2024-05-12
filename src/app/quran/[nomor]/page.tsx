import { fetchSurah } from "@/lib/api"
import type { Surah } from "@/types/types"
import { AudioPlayerDropdown } from "./components/full-audio";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: { nomor: string } }) {
  const response = await fetchSurah(params.nomor)

  if (response && response.data) {
    const surahs: Surah[] = Array.isArray(response.data) ? response.data : [response.data];

    return (
      <main className="min-h-screen">
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
              <div className="rounded-2xl border-solid border-2 p-5">
                <p className="font-bold">{surah.jumlahAyat} Ayat</p>
                <p className="font-bold">Tempat Turun</p>
                <p>{surah.tempatTurun}</p>
                <p className="font-bold">Deskripsi</p>
                <p><span dangerouslySetInnerHTML={{ __html: surah.deskripsi }} /></p>
                <br/>
                <AudioPlayerDropdown audioUrls={surah.audioFull} />
              </div>
            </div>


            <div className="px-10">
              {surah.ayat.map((ayah) => (
                <div key={ayah.nomorAyat}>
                  <div className="flex flex-col space-y-2 my-5">
                    <span className="text-end text-xl font-semibold mt-2">{ayah.teksArab} - {ayah.nomorAyat.toLocaleString('ar')}</span>
                    <span> {ayah.teksIndonesia} </span>
                  </div>
                  <Separator/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    )
  } else {
    return <div>No data available</div>;
  }
}
