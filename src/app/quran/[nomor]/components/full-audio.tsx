"use client"

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AudioUrls = Record<string, string>;

type ReciterData = {
  id: number;
  name: string;
  audioUrls: AudioUrls;
};

export const AudioPlayerDropdown = ({ audioUrls }: { audioUrls: AudioUrls }) => {
  const [selectedReciter, setSelectedReciter] = useState<string>(""); 

  useEffect(() => {
    if (Object.keys(audioUrls).length > 0) {
      const defaultReciterName = getReciterNameFromUrl(audioUrls[Object.keys(audioUrls)[0]]);
      setSelectedReciter(defaultReciterName); 
    }
  }, [audioUrls]);

  const getReciterNameFromUrl = (audioUrl: string) => {
    const parts = audioUrl.split("/");
    const reciterNameWithDash = parts[parts.length - 2]; 
    const reciterName = reciterNameWithDash.replace(/-/g, ' '); 
    return reciterName;
  };

  const handleAudioChange = (audioUrl: string) => {
    setSelectedReciter(getReciterNameFromUrl(audioUrl)); 
    const audioElement = document.getElementById("audioPlayer") as HTMLAudioElement;
    audioElement.src = audioUrl;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-blue-600 rounded-full text-white px-3 py-1 hover:bg-blue-500 mb-2">{selectedReciter || "Choose Reciter"}</DropdownMenuTrigger> 
      <DropdownMenuContent className="mt-2">
        {Object.entries(audioUrls).map(([key, audioUrl]) => (
          <DropdownMenuItem className="m-1 cursor-pointer" key={key} onClick={() => handleAudioChange(audioUrl)}>
            {getReciterNameFromUrl(audioUrl)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      <audio id="audioPlayer" controls className="w-full h-[40px]">
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </DropdownMenu>
  );
};

export default AudioPlayerDropdown;
