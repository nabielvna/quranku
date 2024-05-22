import Image from "next/image";

export default function Page() {
  // Daftar gambar
  const images = [
    { src: "/Gian.jpg", alt: "Gian", Name: "Stevanza Gian Maheswara" },
    { src: "/Nabiel.jpg", alt: "Nabiel", Name: "Vidiawan Nabiel Arrasyid" },
  ];

  // Tampilan komponen
  return (
    <main className="flex flex-col items-center p-10">
      <div className="max-w-4xl mb-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Assalamualaikum, kami dari team lucky strike dari cabang lomba design aplikasi al-qur'an yang diselenggarkan oleh MTQ ITS.
          dan kami berasaldari departemen teknik Informatika ITS tahun 2022.
        </p>
      </div>

      <div className="max-w-4xl flex flex-row space-x-10 mb-8">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex-shrink-0 w-32 h-32 relative">
              <Image src={image.src} layout="fill" objectFit="cover" alt={image.alt} className="rounded-full" />
            </div>
            <div className="mt-4">
              <span className="font-semibold text-lg">{image.Name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl text-lg">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p>
          Harapan kami membuat website ini bukan semata-mata ingin memenangkan lomba, tetapi kami berharap website ini bisa kami kembangkan agar bisa digunakan oleh semua umat muslim.
          Dan kami berharap dengan adanya website ini kami dapat berkontribusi kepada masyarakat dan dapat memudahkan umat muslim dalam membaca Al-Quran 
        </p>
      </div>

      <hr className="my-8 w-full border-gray-300" />

      <div className="max-w-4xl text-lg">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <p>
          Sebagai mahasiswa teknik Informatika, kami mempunyai potensi untuk memajukan teknolgi di Indonesia dan kami sangat senang untuk berkontribusi kepada masyarakat.
          Terima Kasih.
        </p>
      </div>
    </main>
  );
}
