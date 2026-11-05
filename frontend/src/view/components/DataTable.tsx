import type { ReactNode } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

type TColumn<T> = {
    header: string;
    cell: (value: T) => string | ReactNode;
    className?: string;
};

type TProps<T> = {
    columns: TColumn<T>[];
    data: T[];
    emptyComponent?: ReactNode;
};

export default function DataTable<T extends unknown>(props: TProps<T>) {
    const { columns, data, emptyComponent } = props;

    return (
        <Table>
            {data.length ? (
                <>
                    <TableHeader>
                        <TableRow>
                            {columns.map(column => (
                                <TableHead className={column.className}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(item => (
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell className={column.className}>{column.cell(item)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </>
            ) : (
                <div className="w-full h-96 flex items-center justify-center">{emptyComponent}</div>
            )}
        </Table>
    );
}
