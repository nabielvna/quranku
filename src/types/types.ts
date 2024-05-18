export interface Juz {
  id: number;
  juz_number: number;
  verse_mapping: {
    [key: string]: string;
  };
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}
export interface VerseUthmani {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

export interface VerseWithTranslation extends VerseUthmani {
  translation: string;
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  juz_number: number;
}

export interface VersesByChapter {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface ChapterInfo {
  id: number;
  chapter_id: number;
  language_name: string;
  short_text: string;
  source: string;
  text: string;
}

export interface QuranTranslationResponse {
  translations: Translation[];
  meta: TranslationMeta;
}

export interface Translation {
  resource_id: number;
  text: string;
}

export interface TranslationMeta {
  translation_name: string;
  author_name: string;
  filters: {
      verse_key: string;
      resource_id: number;
  };
}