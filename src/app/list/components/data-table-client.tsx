"use client"

import React, { useEffect, useState } from 'react';
import { columns, TableSchema } from './column';
import DataTable from './data-table';
import { fetchSurahs } from '@/lib/api';

type Surah = {
  number: string;
  name: string;
  englishName: string;
  ayahs: number; // Assuming this represents the number of ayahs
}

export default function DataTableClient() {
  const [data, setData] = useState<TableSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahsData = async () => {
      setLoading(true);
      try {
        const response = await fetchSurahs();
        const Surahs: Surah[] = response.data.surahs;
        const mappedData: TableSchema[] = Surahs.map((surah) => ({
          id: surah.number,
          Number: surah.number,
          Surah: surah.name,
          English: surah.englishName,
          Ayahs: surah.ayahs.length,
        }));
        setData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahsData();
  }, []);

  return <DataTable columns={columns} data={data} loading={loading} />;
}
