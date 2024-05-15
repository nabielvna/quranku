import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface TabsTriggerGroupProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

const TabsTriggerGroup: React.FC<TabsTriggerGroupProps> = ({ selectedTab, onTabChange }) => {

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <Tabs defaultValue="chapter">
      <TabsList>
        <TabsTrigger value="chapter" onClick={() => handleTabChange("chapter")} active={selectedTab === "chapter"}>
          Chapters
        </TabsTrigger>
        <TabsTrigger value="juz" onClick={() => handleTabChange("juz")} active={selectedTab === "juz"}>
          Juz
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsTriggerGroup;