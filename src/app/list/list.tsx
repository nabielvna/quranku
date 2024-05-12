"use client"

import { useEffect, useState } from 'react';
import { fetchSurahs } from '@/lib/api';
import { Surah } from '../../types/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SurahList: React.FC = () => {
    const [surahs, setSurahs] = useState<Surah[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchSurahs();
                setSurahs(response.data.surahs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>List of Surahs</TableCaption>
                <TableHeader className='w-fit'>
                    <TableRow>
                        <TableHead className='w-fit'>Number</TableHead>
                        <TableHead className='w-fit'>Surah</TableHead>
                        <TableHead className='w-fit'>English Name</TableHead>
                        <TableHead className='w-fit'>Ayahs</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {surahs.map((surah) => (
                        <TableRow key={surah.number}>
                            <TableCell>{surah.number}</TableCell>
                            <TableCell>{surah.name}</TableCell>
                            <TableCell>{surah.englishName}</TableCell>
                            <TableCell>{surah.ayahs.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SurahList;
