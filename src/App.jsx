import * as React from 'react'
import { Theme } from './components/Theme'

import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TDTable } from './components/TDTable'

const DEFAULTS = {
  columnResizeMode: 'onChange',
  columnResizeDirection: 'ltr',
}

const columnHelper = createColumnHelper()
// Function to calculate the width based on the largest string in the data
function calculateColumnWidth(data, accessorKey) {
  const maxLength = Math.max(...data.map(item => item[accessorKey].length));
  const charWidth = 7; // Approximate width of a character in pixels
  return maxLength * charWidth;
}


function App() {
  const [data, setdata] = React.useState(() => [
    {
      firstName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ])
  const columns = React.useMemo(() => [
    {
      accessorKey: 'firstName',
      cell: info => info.getValue(),
      size: calculateColumnWidth(data, 'firstName'), // Dynamic column width
    },
    {
      accessorFn: row => row.lastName, // Using accessorFn instead of accessor
      id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    },
    {
      accessorKey: 'age',
      header: () => 'Age',
      cell: info => info.renderValue(),
    },
    {
      accessorKey: 'visits',
      header: () => <span>Visits</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'progress',
      header: 'Profile Progress',
    },
  ], [data]); // Adding `data` as a dependency


  const [columnVisibility, setColumnVisibility] = React.useState({
    lastName: false,

  })
  const table = useReactTable({
    data,
    columns: columns,
    columnResizeMode: DEFAULTS.columnResizeMode,

    state: {
      columnVisibility,
      // Other state settings
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <TDTable table={table} />
      <div className='divider'></div>
      <button className=' btn btn-error btn-sm text-error-content' onClick={() => setdata(data.slice(0, -1))}>delete row</button>

      <div className="form-control w-32">
        <label className="label cursor-pointer">
          <span className="label-text">lastname</span>
          <input type="checkbox" className="toggle toggle-primary" onChange={e => setColumnVisibility(prev => ({
            ...prev,
            lastName: e.target.checked,
          }))} />
        </label>
      </div>
      <Theme />
    </>
  )
}

export default App
