

import axios from 'axios';
import { ApiResponse } from '../types/types';

const API_URL = 'http://api.alquran.cloud/v1/quran/quran-uthmani';

export const fetchSurahs = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the API');
  }
};