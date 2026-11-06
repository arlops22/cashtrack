import type { ReactNode } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Skeleton } from './ui/Skeleton';

type TColumn<T> = {
    id: string;
    header: string;
    cell: (value: T) => string | ReactNode;
    className?: string;
};

type TProps<T> = {
    columns: TColumn<T>[];
    data: T[];
    emptyComponent?: ReactNode;
    isLoading?: boolean;
};

export default function DataTable<T extends { id: number }>(props: TProps<T>) {
    const { columns, data, isLoading, emptyComponent } = props;

    const emtpyTable = <div className="w-full h-96 flex items-center justify-center">{emptyComponent}</div>;
    const tableData = (
        <>
            <TableHeader>
                <TableRow>
                    {columns.map(column => (
                        <TableHead key={`header-${column.id}`} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(item => (
                    <TableRow key={item.id}>
                        {columns.map(column => (
                            <TableCell key={`cell-${column.id}`} className={column.className}>
                                {column.cell(item)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </>
    );
    const loadingTable = (
        <>
            <TableHeader>
                <TableRow>
                    {columns.map(column => (
                        <TableHead key={`header-${column.id}`} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {new Array(10).fill('').map((_, index) => (
                    <TableRow key={`skeleton-row-${index}`} className="bg-white!">
                        {columns.map(column => (
                            <TableCell key={`cell-${column.id}`} className={column.className}>
                                <Skeleton className={'h-4 flex-1'} />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </>
    );

    if (isLoading) return <Table>{loadingTable}</Table>;

    return <Table>{data.length ? tableData : emtpyTable}</Table>;
}
