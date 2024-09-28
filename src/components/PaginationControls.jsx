const SvgIcon = ({ className, flip = false }) => (
    <svg className={`${className} ${flip ? 'rotate-180' : ''} size-2`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m17.5 9.9964c0 .7756-.375 1.5262-1 2.0016l-10 7.5062c-.45.3252-.975.5004-1.5.5004-.375 0-.775-.0751-1.125-.2753-.85-.4253-1.375-1.301-1.375-2.2268v-15.01223c0-.95077.525-1.826489 1.375-2.226816.85-.425348 1.85-.3252667 2.625.225183l10 7.506133c.625.47538 1 1.20098 1 2.00163z" fill="currentColor"></path></svg>
);

const PaginationControls = ({ table }) => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalPages = table.getPageCount();

    return (
        <div className="flex justify-between items-center border-base-300 bg-base-300">
            {/* Items per page */}
            <div className="flex items-center space-x-2">
                <div className="join">
                    <div className="bg-base-300 rounded-l-none join-item text-sm px-2 flex items-center">Rows</div>
                    <div className="join-item custom-select relative">
                        <select
                            className="select select-sm rounded-s-none pl-0 focus:outline-primary transition-all"
                            value={pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                        >
                            {[5, 10, 25, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <SvgIcon className="pointer-events-none rotate-90 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Page navigation */}
            <div className="join relative">
                <button
                    className="join-item btn btn-sm bg-base-300 border-none shadow-none focus:outline-primary"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <SvgIcon flip />
                </button>

                {/* Page selection dropdown */}
                <div className="custom-select relative">
                    <select
                        className="select select-sm join-item w-full outline-0 focus:outline-primary transition-all"
                        value={pageIndex + 1}
                        onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
                    >
                        {Array.from({ length: totalPages }, (_, i) => (
                            <option key={i} value={i + 1}>
                                Page {i + 1}
                            </option>
                        ))}
                    </select>
                    <SvgIcon className="pointer-events-none rotate-90 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                <button
                    className="join-item btn btn-sm bg-base-300 border-none shadow-none focus:outline-primary rounded-r-none"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <SvgIcon />
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;
