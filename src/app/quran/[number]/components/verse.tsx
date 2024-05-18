import { VerseWithTranslation } from "@/types/types";
import { convertLatinToArabic } from "@/utils/number-dict";

type Props = {
  verse: VerseWithTranslation;
  selectedOptions: string[];
};

const QuranVerse: React.FC<Props> = ({ verse, selectedOptions }) => {
  const getVerseKey = () => {
    const colonIndex = verse.verse_key.indexOf(':');
    if (colonIndex !== -1) {
      const latinNumbers = verse.verse_key.substring(colonIndex + 1);
      return latinNumbers;
    }
    return verse.verse_key; 
  };

  return (
    <div className="flex flex-col space-y-2 my-5">
      <div className="flex flex-col mt-2">
        <span className="text-end text-xl font-semibold">{verse.text_uthmani} - {convertLatinToArabic(getVerseKey())}</span>

        {selectedOptions.includes('Translation') && (
          <span>{verse.translation} - {getVerseKey()}</span>
        )}
      </div>
    </div>
  );
};

export default QuranVerse;
