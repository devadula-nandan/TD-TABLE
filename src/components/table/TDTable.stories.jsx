import React, { useEffect, useCallback } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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

const BaseTemplate = React.memo(({ tableHeight, tableWidth, stickyHeader }) => {
  const [sorting, setSorting] = React.useState([]);
  const [data, setData] = React.useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]); // empty objects render skeletons

  useEffect(() => {
    const timeout = setTimeout(() => setData(makeData(10)), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "rowIndex",
        header: () => <span>Row Index</span>,
        cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, "rowIndex", "Row Index"),
        minSize: minHeaderWidth("Row Index"),
      },
      {
        accessorKey: "firstName",
        header: () => <span>First Name</span>,
        cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, "firstName", "First Name"),
        minSize: minHeaderWidth("First Name"),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => <span className="line-clamp-1 break-all">{<i>{info.getValue()}</i>}</span>,
        header: () => <span>Last Name</span>,
        size: maxDataWidth(data, "lastName", "Last Name"),
        minSize: minHeaderWidth("Last Name"),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, "status", "Status"),
        minSize: minHeaderWidth("Status"),
      },
      {
        accessorKey: "joined",
        header: "Joined",
        cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, "joined", "Joined"),
        minSize: minHeaderWidth("Joined"),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
        size: maxDataWidth(data, "role", "Role"),
        minSize: minHeaderWidth("Role"),
      },
      {
        accessorKey: "password",
        header: "Password",
        cell: (info) => <span className="line-clamp-1 break-all">{'•'.repeat(info.getValue()?.length)}</span>,
        size: maxDataWidth(data, "password", "Password"),
        minSize: minHeaderWidth("Password"),
      },
      {
        accessorKey: "passwordStrength",
        header: "Password Strength",
        size: maxDataWidth(data, "passwordStrength", "Password Strength"),
        minSize: minHeaderWidth("Password Strength"),
      },
      {
        accessorKey: "age",
        header: () => "Age",
        cell: (info) => info.renderValue(),
        size: maxDataWidth(data, "age", "Age"),
        minSize: minHeaderWidth("Age"),
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        size: maxDataWidth(data, "visits", "Visits"),
        minSize: minHeaderWidth("Visits"),
      },
      ...Array(7)
        .fill(0)
        .map((_, index) => ({
          accessorKey: `person${index + 1}`,
          header: `Person ${index + 1}`,
          cell: (info) => <span className="line-clamp-1 break-all">{info.getValue()}</span>,
          size: maxDataWidth(data, `person${index + 1}`, `Person ${index + 1}`),
          minSize: minHeaderWidth(`Person ${index + 1}`),
        })),
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: DEFAULTS.columnResizeMode,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <TDTable table={table} tableHeight={tableHeight} tableWidth={tableWidth} stickyHeader={stickyHeader} />
    </>
  );
});

export const Basic = {
  render: (args) => <BaseTemplate {...args} />,
};
