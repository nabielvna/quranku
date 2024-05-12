import { fetchSurahs } from '@/lib/api';
import type { Surah } from '../../types/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function SurahList() {
    const data = await fetchSurahs();
    const surahs: Surah[] = data.data;

    return (
        <div>
            <Table>
                <TableCaption>List of Surahs</TableCaption>
                <TableHeader className='w-fit'>
                    <TableRow>
                        <TableHead className='w-fit'>Nomor</TableHead>
                        <TableHead className='w-fit'>Surah</TableHead>
                        <TableHead className='w-fit'>Nama Latin</TableHead>
                        <TableHead className='w-fit'>Ayat</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {surahs && surahs.map((surah) => (
                        <TableRow key={surah.nomor}>
                            <TableCell>{surah.nomor}</TableCell>
                            <TableCell>{surah.nama}</TableCell>
                            <TableCell>{surah.namaLatin}</TableCell>
                            <TableCell>{surah.jumlahAyat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
