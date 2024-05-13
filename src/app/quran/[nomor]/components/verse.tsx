import { VerseUthmani } from "@/types/types";
import { latinToArabic } from "@/utils/number-dict";

type Props = {
  verse: VerseUthmani;
  selectedOptions: string[];
};

const QuranVerse: React.FC<Props> = ({ verse, selectedOptions }) => {
  const convertLatinToArabic = (latinNumber: string) => {
    return latinNumber.split('').map(digit => latinToArabic[digit] || digit).join('');
  };

  const getArabicVerseKey = () => {
    const colonIndex = verse.verse_key.indexOf(':');
    if (colonIndex !== -1) {
      const latinNumbers = verse.verse_key.substring(colonIndex + 1);
      return convertLatinToArabic(latinNumbers); 
    }
    return verse.verse_key; 
  };

  return (
    <div className="flex flex-col space-y-2 my-5">
      <div className="flex flex-col mt-2">
        {selectedOptions.includes('Ayat') && (
          <span className="text-end text-xl font-semibold">{verse.text_uthmani} - {getArabicVerseKey()}</span>
        )}

        {selectedOptions.includes('Latin') && (
          <span> {verse.verse_key}</span>
        )}

        {selectedOptions.includes('Terjemah') && (
          <span> {verse.verse_key}</span>
        )}
      </div>
    </div>
  );
};

export default QuranVerse;
