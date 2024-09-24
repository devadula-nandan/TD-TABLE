import * as React from 'react';
import { Theme } from './components/Theme';
import ColumnControl from './components/ColumnControl';
import { minHeaderWidth, maxDataWidth, makeData } from './utils';
import './index.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TDTable } from './components/TDTable';

const DEFAULTS = {
  columnResizeMode: 'onChange',
};

const columnHelper = createColumnHelper();

function App() {
  const [sorting, setSorting] = React.useState([])
  const [data, setData] = React.useState(() => makeData(100));

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'rowIndex',
        header: () => <span>Row Index</span>,
        cell: (info) => info.getValue(),
        size: maxDataWidth(data, 'rowIndex', 'Row Index'),
        minSize: minHeaderWidth('Row Index'),
      },
      {
        accessorKey: 'firstName',
        header: () => <span>First Name</span>,
        cell: (info) => info.getValue(),
        size: maxDataWidth(data, 'firstName', 'First Name'),
        minSize: minHeaderWidth('First Name'),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        size: maxDataWidth(data, 'lastName', 'Last Name'),
        minSize: minHeaderWidth('Last Name'),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: maxDataWidth(data, 'status', 'Status'),
        minSize: minHeaderWidth('Status'),
      },
      {
        accessorKey: 'joined',
        header: 'Joined',
        size: maxDataWidth(data, 'joined', 'Joined'),
        minSize: minHeaderWidth('Joined'),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: maxDataWidth(data, 'role', 'Role'),
        minSize: minHeaderWidth('Role'),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        cell: () => '••••••••', // Mask password display
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
          size: maxDataWidth(data, `person${index + 1}`, `Person ${index + 1}`),
          minSize: minHeaderWidth(`Person ${index + 1}`),
        })),
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

  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    }
    return colSizes
  }, [table.getState().columnSizingInfo, table.getState().columnSizing, columnVisibility])

  return (
    <>
      <TDTable table={table} setData={setData} columnSizeVars={columnSizeVars} />

      <div className="divider"></div>
      <div className="flex gap-1 flex-wrap">
        <ColumnControl
          table={table}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
        <input
          type="number"
          placeholder="Rows to Generate"
          value={data.length}
          className="input input-bordered input-primary input-sm" onChange={async (e) => {
            if (data.length < e.target.value) {
              setData([
                ...data,
                ...(await makeData(e.target.value - data.length, data.length)),
              ])
            } else {
              setData(data.slice(0, e.target.value))
            }
          }} />
      </div>
      <Theme />
    </>
  );
}

export default App;
