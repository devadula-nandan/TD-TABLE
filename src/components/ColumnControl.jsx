const SvgIcon = ({ className, flip = false }) => (
  <svg className={`${className} ${flip ? 'rotate-180' : ''} size-2`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m17.5 9.9964c0 .7756-.375 1.5262-1 2.0016l-10 7.5062c-.45.3252-.975.5004-1.5.5004-.375 0-.775-.0751-1.125-.2753-.85-.4253-1.375-1.301-1.375-2.2268v-15.01223c0-.95077.525-1.826489 1.375-2.226816.85-.425348 1.85-.3252667 2.625.225183l10 7.506133c.625.47538 1 1.20098 1 2.00163z" fill="currentColor"></path></svg>
);

const ColumnControl = ({ table, columnVisibility, setColumnVisibility }) => {
  return (
    <>
      <button className="btn btn-sm" onClick={() => document.getElementById('my_modal_5').showModal()}>
        Column Control
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0">
          <h3 className="font-bold text-lg py-4 ps-8 border-b-2 border-base-300">Column Control</h3>
          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          </div>
          <div className="my-3 max-h-[70vh] overflow-auto">
            {table.getAllColumns().map((column) => (
              <div key={column.id} className="form-control transition-all mb-4 mt-2">
                <div className="items-center gap-2 px-8 flex">
                  <div className="flex justify-between relative">
                    <select
                      className="select select-sm select-primary"
                      value={column.getIsPinned() || 'unset'}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'left') {
                          column.pin('left');
                        } else if (value === 'right') {
                          column.pin('right');
                        } else {
                          column.pin(false); // Unset
                        }
                      }}
                    >
                      <option value="unset">Unset</option>
                      <option value="left">Pin Left</option>
                      <option value="right">Pin Right</option>
                    </select>
                    <SvgIcon className="pointer-events-none rotate-90 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="label-text">{column.id}</span>
                  <input
                    defaultChecked={column.getIsVisible()}
                    type="checkbox"
                    className="toggle toggle-sm toggle-primary ml-auto"
                    onChange={(e) => {
                      setColumnVisibility({
                        ...columnVisibility,
                        [column.id]: e.target.checked,
                      });
                    }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ColumnControl;
