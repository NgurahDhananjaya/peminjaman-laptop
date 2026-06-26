import ActionIconButtons from '@/Components/ActionIconButtons';
import PaginationFooter from '@/Components/PaginationFooter';
import SearchFilterToolbar from '@/Components/SearchFilterToolbar';
import StatusChip from '@/Components/StatusChip';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';

const emptyPaginator = {
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
};

const loanStatuses = ['Sedang Dipinjam', 'Sudah Dikembalikan'];

function cleanParams(params) {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined),
    );
}

function getLoanStatus(item) {
    return item.status ?? (item.tanggal_kembali ? 'Sudah Dikembalikan' : 'Sedang Dipinjam');
}

function formatDate(value) {
    if (!value) {
        return '-';
    }

    return String(value).split('T')[0];
}

export default function PeminjamanIndex({ data, filters = {} }) {
    const paginator = data ?? emptyPaginator;
    const [selectedStatus, setSelectedStatus] = useState('');

    const visitIndex = (params) => {
        router.get(route('peminjaman.index'), cleanParams(params), {
            preserveState: true,
            replace: true,
        });
    };

    const rows = selectedStatus
        ? paginator.data.filter((item) => getLoanStatus(item) === selectedStatus)
        : paginator.data;

    const handleReturn = (item) => {
        if (window.confirm(`Mark ${item.nama_peminjam}'s laptop as returned?`)) {
            router.patch(route('peminjaman.kembalikan', item.id));
        }
    };

    return (
        <AppLayout activeTab="peminjaman">
            <Head title="Loans" />

            <SearchFilterToolbar
                search={filters.search ?? ''}
                status={selectedStatus}
                statuses={loanStatuses}
                buttonLabel="New Loan"
                searchLabel="Search Loans"
                searchPlaceholder="Search borrower, laptop name or code..."
                onSearchChange={(search) => visitIndex({ ...filters, search, page: 1 })}
                onStatusChange={setSelectedStatus}
                onButtonClick={() => router.visit(route('peminjaman.create'))}
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                            {['ID', 'BORROWER', 'LAPTOP', 'LOAN DATE', 'RETURN DATE', 'STATUS', 'TOOLS'].map((column) => (
                                <TableCell
                                    key={column}
                                    align={column === 'TOOLS' ? 'right' : 'left'}
                                    sx={{
                                        color: '#6b7280',
                                        fontSize: 12,
                                        fontWeight: 800,
                                        letterSpacing: 0,
                                        py: 2,
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ color: '#6b7280', py: 5 }}>
                                    No loans found.
                                </TableCell>
                            </TableRow>
                        )}

                        {rows.map((item) => {
                            const status = getLoanStatus(item);

                            return (
                                <TableRow key={item.id} hover>
                                    <TableCell sx={{ color: '#374151', fontWeight: 700 }}>
                                        {`#LN-${String(item.id).padStart(3, '0')}`}
                                    </TableCell>
                                    <TableCell sx={{ color: '#1f2937', fontWeight: 700 }}>
                                        {item.nama_peminjam}
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-semibold text-slate-800">
                                            {item.laptop?.nama ?? '-'}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {item.laptop?.kode ?? '-'}
                                        </p>
                                    </TableCell>
                                    <TableCell sx={{ color: '#4b5563' }}>{formatDate(item.tanggal_pinjam)}</TableCell>
                                    <TableCell sx={{ color: '#4b5563' }}>{formatDate(item.tanggal_kembali)}</TableCell>
                                    <TableCell>
                                        <StatusChip status={status} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="flex items-center justify-end gap-2">
                                            {status === 'Sedang Dipinjam' && (
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => handleReturn(item)}
                                                    sx={{ textTransform: 'none', fontWeight: 700 }}
                                                >
                                                    Return
                                                </Button>
                                            )}
                                            <ActionIconButtons
                                                onView={() => router.visit(route('peminjaman.show', item.id))}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <PaginationFooter
                    currentPage={paginator.current_page}
                    lastPage={paginator.last_page}
                    total={paginator.total}
                    perPage={paginator.per_page}
                    label="items"
                    onPageChange={(page) => visitIndex({ ...filters, page })}
                />
            </div>
        </AppLayout>
    );
}
