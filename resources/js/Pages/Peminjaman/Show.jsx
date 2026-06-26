import StatusChip from "@/Components/StatusChip";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@mui/material";

function formatDate(value) {
    if (!value) {
        return "-";
    }

    return String(value).split("T")[0];
}

export default function PeminjamanShow({ peminjaman }) {
    const status = peminjaman?.tanggal_kembali
        ? "Sudah Dikembalikan"
        : "Sedang Dipinjam";

    return (
        <AppLayout activeTab="peminjaman">
            <Head title="Loan Detail" />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {peminjaman?.nama_peminjam}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {peminjaman?.laptop?.nama ?? "-"} ·{" "}
                            {peminjaman?.laptop?.kode ?? "-"}
                        </p>
                    </div>
                    <StatusChip status={status} />
                </div>

                <hr className="my-6 border-slate-200" />

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                            LOAN DATE
                        </p>
                        <p className="text-sm text-slate-700">
                            {formatDate(peminjaman?.tanggal_pinjam)}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                            RETURN DATE
                        </p>
                        <p className="text-sm text-slate-700">
                            {formatDate(peminjaman?.tanggal_kembali)}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                        variant="outlined"
                        onClick={() => router.visit(route("peminjaman.index"))}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                        Back
                    </Button>
                    {status === "Sedang Dipinjam" && (
                        <Button
                            variant="contained"
                            onClick={() =>
                                router.patch(
                                    route(
                                        "peminjaman.kembalikan",
                                        peminjaman.id,
                                    ),
                                    {},
                                )
                            }
                            sx={{ textTransform: "none", fontWeight: 800 }}
                        >
                            Mark Returned
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
