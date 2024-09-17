
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
              <div key={column.id} className="form-control transition-all">
                <label className="label cursor-pointer px-8">
                  <span className="label-text">{column.id}</span>
                  <input
                    defaultChecked={
                      column.getIsVisible()}
                    type="checkbox"
                    className="toggle toggle-sm toggle-primary"
                    onChange={(e) => {
                      setColumnVisibility({
                        ...columnVisibility,
                        [column.id]: e.target.checked,
                      });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};
export default ColumnControl;