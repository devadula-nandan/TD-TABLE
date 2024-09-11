import React from "react";
import { flexRender } from "@tanstack/react-table";
import './TDTable.css'
let render = 0
export const TDTable = ({ table }) => {
    // render++ >= 2 ? console.log("performance warning rendered " + render + " times") : null
    return (
        <div className="overflow-x-auto w-full">
            <table className=" text-sm border-[1px] border-base-300 transition-all"
                style={{ width: table.getCenterTotalSize() }}
            >
                <thead className=" bg-base-300">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className=" border-b-[1px] border-base-300" onClick={() => console.log("header row clicked")}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className=" text-left p-2 font-medium" onClick={() => console.log("header cell clicked")}
                                    style={{ width: header.getSize() }}
                                    {...{
                                        colSpan: header.colSpan,
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    <div
                                        {...{
                                            onDoubleClick: () => header.column.resetSize(),
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                            className: ` transition-all resizer ${table.options.columnResizeDirection
                                                } ${header.column.getIsResizing() ? 'isResizing' : ''
                                                }`,
                                            style: {
                                                transform:
                                                    table.options.columnResizeMode === 'onEnd' &&
                                                        header.column.getIsResizing()
                                                        ? `translateX(${(table.options.columnResizeDirection ===
                                                            'rtl'
                                                            ? -1
                                                            : 1) *
                                                        (table.getState().columnSizingInfo
                                                            .deltaOffset ?? 0)
                                                        }px)`
                                                        : '',
                                            },
                                        }}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className=" border-b-[1px] border-base-300 bg-base-200 hover:bg-base-300 transition-all" onClick={() => console.log('row clicked')}>
                            {row.getVisibleCells().map((cell) => (
                                <td style={{ width: cell.column.getSize() }}
                                    key={cell.id}
                                    className="p-2"
                                    onClick={() => console.log('cell clicked')}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};