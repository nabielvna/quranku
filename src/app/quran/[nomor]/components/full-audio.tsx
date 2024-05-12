"use client"

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AudioUrls = Record<string, string>;

export const AudioPlayerDropdown = ({ audioUrls }: { audioUrls: AudioUrls }) => {
  const [selectedAudio, setSelectedAudio] = useState(Object.keys(audioUrls)[0]);
  
  const handleAudioChange = (audioKey: string) => {
    setSelectedAudio(audioKey);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Choose Audio</DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(audioUrls).map((key) => (
          <DropdownMenuItem key={key} onClick={() => handleAudioChange(key)}>
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      <audio controls>
        {/* Update the source based on the selectedAudio state */}
        <source src={audioUrls[selectedAudio]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </DropdownMenu>
  );
};