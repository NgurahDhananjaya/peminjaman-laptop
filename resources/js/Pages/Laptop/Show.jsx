import StatusChip from '@/Components/StatusChip';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@mui/material';

export default function LaptopShow({ laptop }) {
    return (
        <AppLayout activeTab="laptop">
            <Head title={laptop?.nama ?? 'Asset Detail'} />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {laptop?.nama}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">{laptop?.kode}</p>
                    </div>
                    <StatusChip status={laptop?.status} />
                </div>

                <hr className="my-6 border-slate-200" />

                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    SPECIFICATION
                </p>
                <p className="text-sm text-slate-700">{laptop?.spesifikasi ?? '-'}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                        variant="outlined"
                        onClick={() => router.visit(route('laptop.index'))}
                        sx={{ textTransform: 'none', fontWeight: 700 }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.visit(route('laptop.edit', laptop.id))}
                        sx={{ textTransform: 'none', fontWeight: 800 }}
                    >
                        Edit Asset
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
