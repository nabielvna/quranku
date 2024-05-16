import Link from "next/link";
import { Juz, Chapter } from "@/types/types";
import { convertLatinToArabic } from "@/utils/number-dict";

interface JuzCardProps {
  juz: Juz;
  chapterList: Chapter[];
  selectedJuzId: number | null;
  handleJuzClick: (id: number) => void;
  juzRef: React.RefObject<HTMLDivElement>; 
}

const JuzCard = ({ juz, chapterList, selectedJuzId, handleJuzClick, juzRef }: JuzCardProps) => (
  <div ref={juzRef}>
    <div
      className={`${selectedJuzId === juz.id && 'border-teal-300'} flex flex-col border-2 space-y-2 rounded-sm p-3 hover:border-teal-300 hover:shadow-teal-300 hover:cursor-pointer`}
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
);

export default JuzCard;
