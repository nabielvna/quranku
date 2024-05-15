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
    <div className="flex">
      <button
        className={`px-4 py-2 font-semibold focus:outline-none ${
          selectedTab === "chapter" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
        }`}
        onClick={() => handleTabChange("chapter")}
      >
        Chapters
      </button>
      <button
        className={`px-4 py-2 font-semibold focus:outline-none ${
          selectedTab === "juz" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
        }`}
        onClick={() => handleTabChange("juz")}
      >
        Juz
      </button>
    </div>
  );
};

export default TabsTriggerGroup;
