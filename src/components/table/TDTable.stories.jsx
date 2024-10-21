import React, { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TDTable from "./TDTable";
import { makeData, maxDataWidth, minHeaderWidth } from "./utils";

export default {
  title: "Example/TDTable",
  component: TDTable,
  args: {
    stickyHeader: false,
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },

  },
  argTypes: {
    table: {
      description: 'The table instance from React Table',
    },
    tableHeight: {
      control: 'text',
      description: 'Optional height of the table. If unset, it adapts to the content.',
    },
    tableWidth: {
      control: 'text',
      description: 'Optional width of the table. If unset, it adapts to the content.',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Whether to enable sticky headers for the table',
    },
  },
};

const DEFAULTS = {
  columnResizeMode: 'onChange',
};

const BaseTemplate = ({ tableHeight, tableWidth, stickyHeader }) => {
  const [sorting, setSorting] = React.useState([])
  const [data, setData] = React.useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]); // empty objects render skeletons
  useEffect(() => {
    const timeout = setTimeout(() => setData(makeData(11)), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'rowIndex',
        header: () => <span>Row Index</span>,
        cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, 'rowIndex', 'Row Index'),
        minSize: minHeaderWidth('Row Index'),
      },
      {
        accessorKey: 'firstName',
        header: () => <span>First Name</span>,
        cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, 'firstName', 'First Name'),
        minSize: minHeaderWidth('First Name'),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => <span className=" line-clamp-1 break-all">{<i>{info.getValue()}</i>}</span>,
        header: () => <span>Last Name</span>,
        size: maxDataWidth(data, 'lastName', 'Last Name'),
        minSize: minHeaderWidth('Last Name'),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, 'status', 'Status'),
        minSize: minHeaderWidth('Status'),
      },
      {
        accessorKey: 'joined',
        header: 'Joined',
        cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, 'joined', 'Joined'),
        minSize: minHeaderWidth('Joined'),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, 'role', 'Role'),
        minSize: minHeaderWidth('Role'),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        cell: (info) => <span className="line-clamp-1 break-all">{'•'.repeat(info.getValue()?.length)}</span>,
        size: maxDataWidth(data, 'password', 'Password'),
        minSize: minHeaderWidth('Password'),
      },
      {
        accessorKey: 'passwordStrength',
        header: 'Password Strength',
        size: maxDataWidth(data, 'passwordStrength', 'Password Strength'),
        minSize: minHeaderWidth('Password Strength'),
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        cell: (info) => info.renderValue(),
        size: maxDataWidth(data, 'age', 'Age'),
        minSize: minHeaderWidth('Age'),
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: maxDataWidth(data, 'visits', 'Visits'),
        minSize: minHeaderWidth('Visits'),
      },
      ...Array(7)
        .fill(0)
        .map((_, index) => ({
          accessorKey: `person${index + 1}`,
          header: `Person ${index + 1}`,
          cell: (info) => <span className=" line-clamp-1 break-all">{info.getValue()}</span>,
          size: maxDataWidth(data, `person${index + 1}`, `Person ${index + 1}`),
          minSize: minHeaderWidth(`Person ${index + 1}`),
        })),
      // {
      //   accessorKey: 'actions',
      //   header: () => <span className=' invisible h-0 w-0'>Actions</span>,
      //   size: 36,
      //   minSize: 36,
      //   enableSorting: false,
      //   cell: (info) => (
      //     <div
      //       className="flex justify-end items-center pr-1"
      //       style={{ height: '100%' }}
      //     >
      //       <button
      //         className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full btn-circle btn-xs p-[0.2rem]"
      //         onClick={() => {
      //           setData((old) => old.filter((_, i) => i !== info.row.index));
      //         }}
      //       >
      //         <svg
      //           xmlns="http://www.w3.org/2000/svg"
      //           fill="none"
      //           viewBox="0 0 24 24"
      //           strokeWidth={1.5}
      //           stroke="currentColor"
      //           className="size-3 m-auto"
      //         >
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      //           />
      //         </svg>
      //       </button>
      //     </div>
      //   )
      // },
    ],
    [data]
  );

  const [columnVisibility, setColumnVisibility] = React.useState({
    lastName: false,
  });

  const table = useReactTable({
    data,
    columns: columns,
    columnResizeMode: DEFAULTS.columnResizeMode,
    state: { columnVisibility, sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  return (
    <>
      <TDTable table={table} tableHeight={tableHeight} tableWidth={tableWidth} stickyHeader={stickyHeader} />
    </>
  );
};

export const Basic = {
  render: (args) => <BaseTemplate {...args} />,
};
