import Image from "next/image";

export default function Page() {
  const images = [
    { src: "/Gian.jpg", alt: "Gian", Name: "Stevanza Gian Maheswara" },
    { src: "/Nabiel.jpg", alt: "Nabiel", Name: "Vidiawan Nabiel Arrasyid" },
  ];

  return (
    <main className="flex flex-col h-screen items-center p-10 mt-24">
      <div className="max-w-4xl mb-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
        </p>
      </div>

      <hr className="my-8 w-full border-gray-300" />

      <div className="max-w-4xl text-lg">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
        </p>
      </div>
    </main>
  );
}