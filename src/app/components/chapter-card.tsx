import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Chapter } from "@/types/types";
import { Separator } from "@/components/ui/separator";

interface ChapterCardProps {
  chapter: Chapter;
}

const ChapterCard = ({ chapter }: ChapterCardProps) => (
  <HoverCard>
    <HoverCardTrigger>
      <Link key={chapter.id} href={`/quran/${chapter.id}`}>
        <div className="border-2 rounded-sm flex flex-row justify-between items-center p-3 hover:border-teal-300 hover:shadow-teal-300 hover:shadow-xs">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-center mx-3">
              <p className="font-bold">{Number(chapter.id).toLocaleString('ar-EG')}</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold">{chapter.name_complex}</p>
              <p className="text-xs">{chapter.translated_name.name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-end text-end flex-grow-0 w-auto">
            <p className="font-bold text-sm">{chapter.name_arabic}</p>
            <p className="text-xs">{chapter.verses_count} Verses</p>
          </div>
        </div>
      </Link>
    </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="font-bold text-xs">{chapter.name_simple}</p>
            <Separator className="mb-1 mt-2" />
            <p className="font-bold text-xs">Revelation</p>
            <div className="flex flex-row justify-between capitalize font-semibold text-xs space-x-10">
              <span>Place:</span>
              <span>{chapter.revelation_place}</span>
            </div>
            <div className="flex flex-row justify-between capitalize font-semibold text-xs">
              <span>Order:</span>
              <span>{chapter.revelation_order}</span>
            </div>
          </div>
          <Separator className="mb-1 mt-2" />
          {chapter.pages.length > 0 && (
            <p className="flex flex-row justify-between font-semibold text-xs">
              <span>Pages:</span>{" "}
              {chapter.pages.reduce((acc: (number | string)[], page) => {
                if (!acc.includes(page)) {
                  acc.push(page);
                }
                return acc;
              }, []).join(' - ')}
            </p>
          )}
        </div>
      </HoverCardContent>
  </HoverCard>
);

export default ChapterCard;
