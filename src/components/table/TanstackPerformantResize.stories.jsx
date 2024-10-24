// src/stories/TanstackPerformantResize.stories.jsx
import React from 'react';
import './TanstackPerformantResize.css';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { makeData } from '../table/utils';

export default {
    title: 'Example/TanstackPerformantResize',
    component: PerformantResizeTable,
};

function PerformantResizeTable() {
    const defaultColumns = [
        {
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
        },
        {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
        },
    ];

    const [data, _setData] = React.useState(() => makeData(200));
    const [columns] = React.useState(() => [...defaultColumns]);

    const table = useReactTable({
        data,
        columns,
        defaultColumn: {
            minSize: 60,
            maxSize: 800,
        },
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
    });

    const columnSizeVars = React.useMemo(() => {
        const headers = table.getFlatHeaders();
        const colSizes = {};
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            colSizes[`--header-${header.id}-size`] = header.getSize();
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
        }
        return colSizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    return (
        <div className="overflow-x-auto">
            <table
                style={{
                    ...columnSizeVars,
                    width: table.getTotalSize(),
                }}
                className="divTable"
            >
                <thead className="thead">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="tr">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="th"
                                    style={{
                                        width: `calc(var(--header-${header.id}-size) * 1px)`,
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                    <div
                                        onDoubleClick={() => header.column.resetSize()}
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {table.getState().columnSizingInfo.isResizingColumn ? (
                    <MemoizedTableBody table={table} />
                ) : (
                    <TableBody table={table} />
                )}
            </table>
        </div>
    );
}

function TableBody({ table }) {
    return (
        <tbody className="tbody">
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="tr">
                    {row.getVisibleCells().map((cell) => {
                        // simulate expensive render
                        for (let i = 0; i < 10000; i++) {
                            Math.random();
                        }

                        return (
                            <td
                                key={cell.id}
                                className="td"
                                style={{
                                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                                }}
                            >
                                {cell.renderValue()}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
}

const MemoizedTableBody = React.memo(
    TableBody,
    (prev, next) => prev.table.options.data === next.table.options.data
);

export const Basic = () => <PerformantResizeTable />;
