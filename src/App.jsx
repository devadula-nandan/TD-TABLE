import * as React from 'react'
import { Theme } from './components/Theme'
import { minHeaderWidth, maxDataWidth } from './utils'

import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TDTable } from './components/TDTable'

const DEFAULTS = {
  columnResizeMode: 'onChange',//'onEnd'
  columnResizeDirection: 'ltr',
}

const columnHelper = createColumnHelper()



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
      header: () => <span>First Name</span>,
      cell: info => info.getValue(),
      size: maxDataWidth(data, 'firstName', 'First Name'), // Dynamic column width
      minSize: minHeaderWidth('First Name'),
    },
    {
      accessorFn: row => row.lastName, // Using accessorFn instead of accessor
      id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      size: maxDataWidth(data, 'lastName', 'Last Name'),
      minSize: minHeaderWidth('Last Name'),
    },
    {
      accessorKey: 'age',
      header: () => 'Age',
      cell: info => info.renderValue(),
      size: maxDataWidth(data, 'age', 'Age'),
      minSize: minHeaderWidth('Age'),
    },
    {
      accessorKey: 'visits',
      header: () => <span>Visits</span>,
      size: maxDataWidth(data, 'visits', 'Visits'),
      minSize: minHeaderWidth('Visits'),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: maxDataWidth(data, 'status', 'Status'),
      minSize: minHeaderWidth('Status'),
    },
    {
      accessorKey: 'progress',
      header: 'Profile Progress',
      size: maxDataWidth(data, 'progress', 'Profile Progress'),
      minSize: minHeaderWidth('Profile Progress'),
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

    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <TDTable table={table} />
      <div className='divider'></div>
      <button className=' btn btn-error btn-sm text-error-content' onClick={() => setdata(data.slice(0, -1))}>delete row</button>


      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-sm" onClick={() => document.getElementById('my_modal_5').showModal()}>column control</button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">column control</h3>
          <div className="mt-3">
            {table.getAllColumns().map(column => (
              <div key={column.id} className="form-control transition-all">
                <label className="label cursor-pointer">
                  <span className="label-text">{column.id}</span>
                  <input defaultChecked={column.getIsVisible()} type="checkbox" className="toggle toggle-sm toggle-primary" onChange={e => {

                    setColumnVisibility({ ...columnVisibility, [column.id]: e.target.checked })
                  }} />
                </label>
              </div>
            ))}
          </div>
          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              {/* if there is a button in form, it will close the modal */}
            </form>
          </div>
        </div>
      </dialog>

      <Theme />
    </>
  )
}

export default App
