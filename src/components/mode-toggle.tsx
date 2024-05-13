import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button variant="ghost" size="icon" className={`w-full p-2 ${className}`} onClick={toggleTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <MoonIcon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
