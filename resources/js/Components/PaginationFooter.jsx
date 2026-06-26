import { Pagination } from '@mui/material';

export default function PaginationFooter({
    currentPage = 1,
    lastPage = 1,
    total = 0,
    perPage = 10,
    onPageChange,
    label = 'items',
}) {
    const shown = Math.min(total, currentPage * perPage);

    return (
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-slate-500">
                Showing {shown} of {total} {label}
            </p>
            <Pagination
                count={lastPage}
                page={currentPage}
                onChange={(_, page) => onPageChange?.(page)}
                color="primary"
                shape="rounded"
                size="small"
            />
        </div>
    );
}
