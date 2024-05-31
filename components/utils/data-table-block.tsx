"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";


export function DataTableBlocker() {
    const [fakeColumnNames, setFakeColumnNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateFakeColumnNames = () => {
            const names: string[] = [];
            [...Array(5)].forEach(() => {
                names.push(faker.lorem.words(faker.number.int({ min: 2, max: 7 })));
            });
            setFakeColumnNames(names);
            setLoading(false);
        };

        generateFakeColumnNames();
    }, []);


    if (loading) {
        return (
            <div className="w-full">
                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {[...Array(5)].map((_, index) => (
                                    <TableHead key={index} className="text-center blur-sm select-none">Column</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={`skeleton-row-${index}`}>
                                    {[...Array(5)].map((_, index) => (
                                        <TableCell key={index} className="h-12 text-start transition duration-800 ease-in-out filter animate-pulse bg-gray-200" >
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {[...Array(5)].map((index) => (
                                <TableHead key={index} className="text-center blur-sm select-none">Column</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, rowIndex) => (
                            <TableRow key={rowIndex} >
                                {fakeColumnNames.map((columname, index) => (
                                    <TableCell key={index} className="h-12 text-start transition duration-500 ease-in-out filter blur-sm select-none">
                                        {columname}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

}
