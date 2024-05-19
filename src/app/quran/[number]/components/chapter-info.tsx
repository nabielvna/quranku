"use client"

import { useEffect, useState } from "react";
import { fetchChapterInfo } from "@/lib/api";
import { ChapterInfo as ChapterInfoType } from "@/types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  const modifyHtmlStringForHover = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const h2Elements = tempDiv.querySelectorAll("h2");

    const indexedHtmlArray: string[] = [];
    h2Elements.forEach((h2, index) => {
        const indexSpan = document.createElement("span");
        indexSpan.textContent = `${index + 1}. `;
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("flex", "flex-row", "text-sm", "space-x-2");
        wrapperDiv.appendChild(indexSpan);
        wrapperDiv.appendChild(h2);
        indexedHtmlArray.push(wrapperDiv.outerHTML);
    });

    const modifiedHtml = indexedHtmlArray.join('');

    const finalHtml = `<div class="flex flex-col">${modifiedHtml}</div>`;

    return finalHtml;
  };  

  const modifyHtmlStringForDialog = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const h2Elements = tempDiv.querySelectorAll("h2");
    h2Elements.forEach((h2, index) => {
        h2.classList.add("font-semibold");
        if (index !== 0) {
            const separator = document.createElement("hr");
            separator.classList.add("my-4");
            h2.before(separator);
        }
    });

    return tempDiv.innerHTML;
};

  if (!info) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <p>{info.short_text}</p>
    <Dialog>
      <DialogTrigger>
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="font-semibold text-sm text-gray-500 hover:underline hover:cursor-pointer">read more</span>
          </HoverCardTrigger>
          <HoverCardContent className="w-fit">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-start">TOPICS</p>
                <div className="text-sm text-justify" dangerouslySetInnerHTML={{ __html: modifyHtmlStringForHover(info.text) }} />
                <span className="text-xs">
                  {info.source}
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[70%]">
        <DialogHeader>
          <DialogTitle>MORE INFO</DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-[80vh] md:h-[70vh] w-full rounded-md border p-4">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <div className="text-sm text-justify" dangerouslySetInnerHTML={{ __html: modifyHtmlStringForDialog(info.text) }} />
                  <div className="flex items-center pt-2">
                    <span className="text-xs">
                      {info.source}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default ChapterInfoComponent;
