
const ColumnControl = ({ table, columnVisibility, setColumnVisibility }) => {
    return (
      <>
        <button className="btn btn-sm" onClick={() => document.getElementById('my_modal_5').showModal()}>
          Column Control
        </button>
  
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Column Control</h3>
            <div className="mt-3">
              {table.getAllColumns().map((column) => (
                <div key={column.id} className="form-control transition-all">
                  <label className="label cursor-pointer">
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
            <div className="modal-action mt-0">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  };
  export default ColumnControl;