import * as React from 'react';
import { Theme } from './components/Theme';
import ColumnControl from './components/ColumnControl';
import { minHeaderWidth, maxDataWidth, makeData } from './utils';
import './index.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TDTable } from './components/TDTable';

const DEFAULTS = {
  columnResizeMode: 'onChange',
};

const columnHelper = createColumnHelper();

function App() {
  // Add setData back to manage the data state
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
    state: { columnVisibility },
    getCoreRowModel: getCoreRowModel(),
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
  }, [table.getState().columnSizingInfo, table.getState().columnSizing])

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
        {/* create a sm button, with text 100000 rows, after clicking it, generate 100000 rows, and show the button text to generating, once its done, change the text to reset, which upon click, should reset the data to 100 */}
        <button className='btn btn-sm' onClick={(e) => data.length === 100000 ? setData(makeData(100)) : setData(makeData(100000))}>{data.length === 100000 ? 'Set to 100' : 'Set to 100000'}</button>
      </div>
      <Theme />
    </>
  );
}

export default App;
