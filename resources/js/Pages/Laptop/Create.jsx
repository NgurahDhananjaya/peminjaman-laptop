import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';

export default function LaptopCreate() {
    const { data, setData, post, processing, errors } = useForm({
        kode: '',
        nama: '',
        spesifikasi: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('laptop.store'));
    };

    return (
        <AppLayout activeTab="laptop">
            <Head title="New Asset" />

            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        New Asset
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Add a laptop that employees can borrow.
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
                            Save Asset
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
