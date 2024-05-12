import axios from 'axios';
import { ApiResponse } from '../types/types';

const API_URL = 'https://equran.id/api/v2/surat';

export const fetchSurahs = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return ('Failed to fetch data from the API');
  }
};

export const fetchSurah = async (nomor: string) => {
  try {
    const response = await fetch(`${API_URL}/${nomor}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return ('Failed to fetch data from the API');
  }
};