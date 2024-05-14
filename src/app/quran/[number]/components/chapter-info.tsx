"use client"

import { useEffect, useState } from "react";
import { fetchChapterInfo } from "@/lib/api";
import { ChapterInfo as ChapterInfoType } from "@/types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

interface ChapterInfoProps {
  id: number;
}

const ChapterInfoComponent: React.FC<ChapterInfoProps> = ({ id }) => {
  const [info, setInfo] = useState<ChapterInfoType | null>(null);

  useEffect(() => {
    const getChapterInfo = async () => {
      try {
        const data = await fetchChapterInfo(id);
        setInfo(data);
      } catch (error) {
        console.error('Error fetching chapter info:', error);
      }
    };

    getChapterInfo();
  }, [id]);

  const modifyHtmlString = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const h2Elements = tempDiv.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
      h2.classList.add("font-semibold");
      const separator = document.createElement("hr"); 
      separator.classList.add("my-4"); 
      h2.before(separator);
    });

    return tempDiv.innerHTML;
  };

  if (!info) {
    return <p>Loading...</p>;
  }

  const modifiedHtml = modifyHtmlString(info.text);

  return (
    <>
      <p>{info.short_text}</p>
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="font-semibold text-sm text-gray-500 hover:underline hover:cursor-pointer">read more</span>
        </HoverCardTrigger>
        <HoverCardContent className="w-[100vh]">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="font-semibold">MORE INFO</h4>
              <div className="text-sm text-justify" dangerouslySetInnerHTML={{ __html: modifiedHtml }} />
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  {info.source}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default ChapterInfoComponent;
