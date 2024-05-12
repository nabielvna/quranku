import { Ayah } from "@/types/types";

type Props = {
  ayah: Ayah;
  selectedOption: string;
};

const QuranAyah: React.FC<Props> = ({ ayah, selectedOption }) => {
  return (
    <div className="flex flex-col space-y-2 my-5">
      <div className="flex flex-col mt-2">
        {selectedOption === 'Ayat' && (
          <span className="text-end text-xl font-semibold">{ayah.teksArab} - {ayah.nomorAyat.toLocaleString('ar')}</span>
        )}

        {selectedOption === 'Latin' && (
          <span>{ayah.teksLatin} - {ayah.nomorAyat}</span>
        )}

        {selectedOption === 'Terjemah' && (
          <span>{ayah.teksIndonesia} - {ayah.nomorAyat}</span>
        )}
      </div>
    </div>
  );
};

export default QuranAyah;
