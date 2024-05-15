import type { Juz, QuranTranslationResponse, Translation, VerseUthmani } from "@/types/types";
const API_URL = 'https://api.quran.com/api/v4'


export async function fetchJuzs(): Promise<Juz[]> {
  try {
    const response = await fetch(`${API_URL}/juzs`);
    if (!response.ok) {
      throw new Error('Failed to fetch Juzs');
    }
    const data = await response.json();
    return data.juzs;
  } catch (error) {
    console.error('Error fetching Juzs:', error);
    throw error;
  }
}


export async function fetchQuranVersesUthmani(verseKey: string) {
  try {
    const response = await fetch(`${API_URL}/quran/verses/uthmani?verse_key=${verseKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch verses');
    }
    const data = await response.json();
    const verses: VerseUthmani[] = data.verses.map((verse: any) => ({
      id: verse.id,
      verse_key: verse.verse_key,
      text_uthmani: verse.text_uthmani, 
    }));
    return verses;
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
}

export async function fetchQuranTranslation(verseKey: string, translationId: number): Promise<Translation[]> {
  try {
    const response = await fetch(`${API_URL}/quran/translations/${translationId}?verse_key=${verseKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch translations');
    }
    const data: QuranTranslationResponse = await response.json();
    return data.translations;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
}

export async function fetchRandomVerse() {
  try {
    const response = await fetch(`${API_URL}/verses/random`);
    if (!response.ok) {
      throw new Error('Failed to fetch random verse');
    }
    const data = await response.json();
    return data.verse;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    throw error;
  }
}

export const fetchVersesByChapter = async (chapterNumber: string, page: number, perPage: number) => {
  try {
    const response = await fetch(`${API_URL}/verses/by_chapter/${chapterNumber}?page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
};

export async function fetchChapters(id?: number) {
  try {
    const url = id ? `${API_URL}/chapters/${id}` : `${API_URL}/chapters`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }
    const data = await response.json();
    return id ? data.chapter : data.chapters;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
}

export async function fetchChapterInfo(id: number) {
  try {
    const url = `${API_URL}/chapters/${id}/info`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }
    const data = await response.json();
    return data.chapter_info;
  } catch (error) {
    console.error('Error fetching chapter info:', error);
    throw error;
  }
}
