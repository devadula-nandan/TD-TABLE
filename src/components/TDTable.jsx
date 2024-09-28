import React, { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import './TDTable.css';
import PaginationControls from './PaginationControls';

export const TDTable = ({ table, setData, getCommonPinningStyles }) => {
    const columnSizeVars = React.useMemo(() => {
        const headers = table.getFlatHeaders()
        const colSizes = {}
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]
            colSizes[`--header-${header.id}-size`] = header.getSize() + (header.column.getCanSort() ? 20 : 0)
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize() + (header.column.getCanSort() ? 20 : 0)
        }
        return colSizes
    }, [table.getState().columnSizingInfo, table.getState().columnSizing, table.getVisibleFlatColumns()])
    console.log(columnSizeVars);

    const { pageIndex, pageSize } = table.getState().pagination;
    const rows = table.getRowModel().rows;
    const emptyRows = Math.max(0, pageSize - rows.length);

    return (
        <div>
            <div className="overflow-x-auto w-full border-base-300 bg-base-300">
                <table className=" text-sm border-x-[1px] border-base-300 font-mono w-full" style={columnSizeVars}>
                    <thead className="bg-base-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="flex border-b-[1px] border-base-300">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onMouseDown={header.column.getToggleSortingHandler()}
                                        className={`flex items-center justify-between group relative text-left p-2 font-medium whitespace-nowrap text-ellipsis ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                        style={{
                                            ...getCommonPinningStyles(header.column),
                                            width: `calc(var(--header-${header.id}-size) * 1px)`,
                                        }}
                                        {...{ colSpan: header.colSpan }}
                                        title={
                                            header.column.getCanSort()
                                                ? header.column.getNextSortingOrder() === 'asc'
                                                    ? 'Sort ascending'
                                                    : header.column.getNextSortingOrder() === 'desc'
                                                        ? 'Sort descending'
                                                        : 'Clear sort'
                                                : undefined
                                        }
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanSort() && (
                                            {
                                                asc: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 -rotate-180 transition-all opacity-0 group-hover:opacity-100">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                                    </svg>
                                                ),
                                                desc: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 rotate-180 transition-all opacity-0 group-hover:opacity-100">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                                    </svg>
                                                )
                                            }[header.column.getIsSorted()] ?? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 transition-all opacity-0 group-hover:opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                                </svg>
                                            )
                                        )}

                                        {header.column.id !== 'actions' && (
                                            <div onMouseDown={(e) => {
                                                header.getResizeHandler()(e)
                                                e.stopPropagation()
                                            }}
                                                {...{
                                                    onDoubleClick: () => header.column.resetSize(),
                                                    onTouchStart: header.getResizeHandler(),
                                                    className: `bg-base-content absolute w-[2px] top-0 cursor-col-resize h-full select-none transition-opacity resizer ${table.options.columnResizeDirection
                                                        } ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                                                    style: {
                                                        transform:
                                                            table.options.columnResizeMode === 'onEnd' && header.column.getIsResizing()
                                                                ? `translateX(${(table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                                                                (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                                                }px)`
                                                                : '',
                                                    },
                                                }}
                                            />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className={`flex border-b-[1px] border-base-300 bg-base-200 hover:bg-base-300 transition-all`}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            style={{
                                                ...getCommonPinningStyles(cell.column, true),
                                                width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                                            }}
                                            className={
                                                `text-ellipsis overflow-hidden transition-colors shadow-red-600` +
                                                // could be improved by not calling the getter every time, and using css variables
                                                (cell.column.getIsResizing() ?
                                                    table.options.columnResizeDirection === 'rtl'
                                                        ? 'border-l-[1px] border-base-300'
                                                        : 'border-r-[1px] border-base-300'
                                                    : ''
                                                ) + (cell.column.id === 'actions' ? '' : ' p-2')
                                            }
                                            title={cell.getValue()}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                        {Array(emptyRows)
                            .fill(null)
                            .map((_, index) => (
                                <tr key={`empty-${index}`} className="flex border-b-[1px] border-base-300 bg-base-200 h-[37px]">
                                    {table.getVisibleFlatColumns().map((column) => (
                                        <td
                                            key={`empty-cell-${column.id}-${index}`}
                                            className=" p-2 text-ellipsis overflow-hidden"
                                            style={{ width: `calc(${column.getSize()} * 1px + ${column.getCanSort() ? 20 : 0}px)` }}
                                        />
                                    ))}
                                    <td className="action h-9"></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <PaginationControls table={table} />
        </div>
    );
};

