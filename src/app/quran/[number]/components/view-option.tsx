"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye } from "lucide-react";

type Props = {
  options: string[];
  onSelectOption: (option: string) => void;
  selectedOption: string[];
};

const ViewOption: React.FC<Props> = ({ options, onSelectOption, selectedOption }) => {

  const handleOptionSelect = (option: string) => {
    onSelectOption(option);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Eye size={20} strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option, index) => (
          <DropdownMenuItem key={index}>
            <button className="w-full dropdown-item" onClick={() => handleOptionSelect(option)}>
              <span className="w-full flex flex-row space-x-2">
                <span>{selectedOption.includes(option) ? <span>&#10003;</span> : null}</span> 
                <span>{option}</span>
              </span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ViewOption;
