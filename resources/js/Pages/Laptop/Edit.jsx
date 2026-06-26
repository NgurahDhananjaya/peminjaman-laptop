import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';

export default function LaptopEdit({ laptop }) {
    const { data, setData, put, processing, errors } = useForm({
        kode: laptop?.kode ?? '',
        nama: laptop?.nama ?? '',
        spesifikasi: laptop?.spesifikasi ?? '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        put(route('laptop.update', laptop.id));
    };

    return (
        <AppLayout activeTab="laptop">
            <Head title="Edit Asset" />

            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Edit Asset
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Update laptop details.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        label="Code"
                        value={data.kode}
                        onChange={(event) => setData('kode', event.target.value)}
                        error={Boolean(errors.kode)}
                        helperText={errors.kode}
                        fullWidth
                    />
                    <TextField
                        label="Name"
                        value={data.nama}
                        onChange={(event) => setData('nama', event.target.value)}
                        error={Boolean(errors.nama)}
                        helperText={errors.nama}
                        fullWidth
                    />
                    <TextField
                        label="Specification"
                        value={data.spesifikasi}
                        onChange={(event) => setData('spesifikasi', event.target.value)}
                        error={Boolean(errors.spesifikasi)}
                        helperText={errors.spesifikasi}
                        fullWidth
                        multiline
                        minRows={4}
                    />
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() => router.visit(route('laptop.index'))}
                            sx={{ textTransform: 'none', fontWeight: 700 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            sx={{ textTransform: 'none', fontWeight: 800 }}
                        >
                            Update Asset
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
