import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TabsTriggerGroup from "./tabs-trigger";

interface SearchAndTabsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const SearchAndTabs = ({ searchQuery, setSearchQuery, selectedTab, setSelectedTab }: SearchAndTabsProps) => (
  <div className="px-4 w-full flex justify-between">
    <div className="relative w-[45%] flex space-x-3">
      <Input
        className="border-2"
        placeholder="Search chapter"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="text-gray-400 absolute right-1 top-1/2 -translate-y-2/3" />
    </div>
    <TabsTriggerGroup selectedTab={selectedTab} onTabChange={(selectedTab) => setSelectedTab(selectedTab)} />
  </div>
);

export default SearchAndTabs;
