import Image from "next/image";

export default function Page() {
  // Daftar gambar
  const images = [
    { src: "/Gian.jpg", alt: "Gian", Name: "Stevanza Gian Maheswara" },
    { src: "/Nabiel.jpg", alt: "Nabiel", Name: "Vidiawan Nabiel Arrasyid" },
  ];

  return (
    <main className="flex flex-col w-full h-max-screen items-center p-10">
      <div className="flex flex-row space-x-10">
        {images.map((image, index) => (
          <div key={index}>
            <Image src={image.src} width={400} height={400} alt={image.alt} />
            <div>
              <span className="font-semibold">{image.Name}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
