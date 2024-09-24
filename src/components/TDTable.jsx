import React, { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import './TDTable.css';
import PaginationControls from './PaginationControls';

export const TDTable = ({ table, setData, columnSizeVars }) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const rows = table.getRowModel().rows;
    const emptyRows = Math.max(0, pageSize - rows.length);

    return (
        <div>
            <div className="overflow-x-auto w-full border-base-300 bg-base-300">
                <table className=" text-sm border-x-[1px] border-base-300 font-mono w-full overflow-hidden" style={columnSizeVars}>
                    <thead className="bg-base-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="flex border-b-[1px] border-base-300">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onMouseDown={header.column.getToggleSortingHandler()}
                                        className={`flex items-center justify-between group relative text-left py-2 pr-2 ml-1 pl-1 font-medium whitespace-nowrap text-ellipsis ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                        style={{ width: `calc(${header.column.getSize()} * 1px + ${header.column.getCanSort() ? 20 : 0}px)` }}
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
                                        {{
                                            asc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 -rotate-180 transition-all opacity-0 group-hover:opacity-100">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                            </svg>
                                            , desc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 rotate-180 transition-all opacity-0 group-hover:opacity-100">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                            </svg>
                                        }[header.column.getIsSorted()] ?? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 transition-all opacity-0 group-hover:opacity-100">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                            </svg>
                                        }
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
                                    </th>
                                ))}
                                <th key="flexer" className="flex-grow h-9"></th>
                                <th key="actions" className="relative h-9 min-w-10 text-left  py-2 pr-2 ml-1 pl-1 font-medium whitespace-nowrap text-ellipsis" />
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id} className={`flex border-b-[1px] border-base-300 bg-base-200 hover:bg-base-300 transition-all group`}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        style={{ width: `calc(${cell.column.getSize()} * 1px + ${cell.column.getCanSort() ? 20 : 0}px)` }}
                                        key={cell.id}
                                        className={` py-2 pr-2 ml-1 pl-1 text-ellipsis overflow-hidden ${cell.column.getIsResizing()
                                            ? table.options.columnResizeDirection === 'rtl'
                                                ? 'border-l-[1px] border-base-300'
                                                : 'border-r-[1px] border-base-300'
                                            : ''
                                            }`}
                                        title={cell.getValue()}
                                    >
                                        <span className=" line-clamp-1 break-all">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                    </td>
                                ))}
                                <td key="flexer" className="flex-grow h-9"></td>
                                <td className="action h-[35px] hidden transition-all group-hover:table-cell">
                                    <button
                                        className="btn btn-sm px-2 h-[34px] aspect-square rounded-box btn-error text-error-content"
                                        onClick={() => setData((prev) => prev.filter((item) => item !== row.original))}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {Array(emptyRows)
                            .fill(null)
                            .map((_, index) => (
                                <tr key={`empty-${index}`} className="flex border-b-[1px] border-base-300 bg-base-100 h-[37px]">
                                    {table.getVisibleFlatColumns().map((column) => (
                                        <td
                                            key={`empty-cell-${column.id}-${index}`}
                                            className=" py-2 pr-2 ml-1 pl-1 text-ellipsis overflow-hidden"
                                            style={{ width: `calc(${column.getSize()} * 1px + ${column.getCanSort() ? 20 : 0}px)` }}
                                        />
                                    ))}
                                    <td key="flexer" className="flex-grow h-9"></td>
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

