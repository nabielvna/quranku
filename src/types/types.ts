export interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
  ayat: Ayah[];
  suratSelanjutnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
  suratSebelumnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
}

export interface ApiResponse {
  code: number;
  message: string;
  data: Surah[];
}
