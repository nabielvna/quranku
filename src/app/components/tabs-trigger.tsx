interface TabsTriggerGroupProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabsTriggerGroup = ({ selectedTab, onTabChange }: TabsTriggerGroupProps) => (
  <div className="flex space-x-3">
    <button
      className={`px-4 py-2 font-semibold focus:outline-none ${
        selectedTab === "chapter" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
      }`}
      onClick={() => onTabChange('chapter')}
    >
      Chapters
    </button>
    <button
      className={`px-4 py-2 font-semibold focus:outline-none ${
        selectedTab === "juz" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
      }`}
      onClick={() => onTabChange('juz')}
    >
      Juz
    </button>
  </div>
);

export default TabsTriggerGroup;

