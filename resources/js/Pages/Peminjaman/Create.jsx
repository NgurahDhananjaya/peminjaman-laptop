import PaginationFooter from "@/Components/PaginationFooter";
import AppLayout from "@/Layouts/AppLayout";
import SearchIcon from "@mui/icons-material/Search";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Button,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { useState } from "react";

const emptyPaginator = {
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
};

function cleanParams(params) {
    return Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) =>
                value !== "" && value !== null && value !== undefined,
        ),
    );
}

export default function PeminjamanCreate({ laptops, filters = {} }) {
    const paginator = laptops ?? emptyPaginator;
    const [search, setSearch] = useState(filters.search ?? "");
    const { data, setData, post, processing, errors } = useForm({
        laptop_id: "",
        nama_peminjam: "",
        tanggal_pinjam: "",
    });

    const visitCreate = (params) => {
        router.get(route("peminjaman.create"), cleanParams(params), {
            preserveState: true,
            replace: true,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("peminjaman.store"));
    };

    return (
        <AppLayout activeTab="peminjaman">
            <Head title="New Loan" />

            <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">
                            New Loan
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Choose an available laptop and fill in the borrower
                            details.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="nama_peminjam"
                                    className="mb-2 block text-sm font-semibold text-slate-600"
                                >
                                    Borrower name
                                </label>
                                <TextField
                                    id="nama_peminjam"
                                    value={data.nama_peminjam}
                                    onChange={(event) =>
                                        setData(
                                            "nama_peminjam",
                                            event.target.value,
                                        )
                                    }
                                    error={Boolean(errors.nama_peminjam)}
                                    helperText={errors.nama_peminjam}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="tanggal_pinjam"
                                    className="mb-2 block text-sm font-semibold text-slate-600"
                                >
                                    Loan date
                                </label>
                                <TextField
                                    id="tanggal_pinjam"
                                    type="date"
                                    value={data.tanggal_pinjam}
                                    onChange={(event) =>
                                        setData(
                                            "tanggal_pinjam",
                                            event.target.value,
                                        )
                                    }
                                    error={Boolean(errors.tanggal_pinjam)}
                                    helperText={errors.tanggal_pinjam}
                                    fullWidth
                                />
                            </div>
                        </div>

                        {errors.laptop_id && (
                            <p className="text-sm text-red-600">
                                {errors.laptop_id}
                            </p>
                        )}

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() =>
                                    router.visit(route("peminjaman.index"))
                                }
                                sx={{ textTransform: "none", fontWeight: 700 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing || !data.laptop_id}
                                sx={{ textTransform: "none", fontWeight: 800 }}
                            >
                                Save Loan
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <TextField
                            size="small"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search available laptops..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            fontSize="small"
                                            sx={{ color: "#9ca3af" }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ maxWidth: { sm: 420 }, flex: 1 }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() =>
                                visitCreate({ ...filters, search, page: 1 })
                            }
                            sx={{ textTransform: "none", fontWeight: 700 }}
                        >
                            Search
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#f3f4f6" }}>
                                {["", "CODE", "NAME", "SPECIFICATION"].map(
                                    (column) => (
                                        <TableCell
                                            key={column || "select"}
                                            sx={{
                                                color: "#6b7280",
                                                fontSize: 12,
                                                fontWeight: 800,
                                                letterSpacing: 0,
                                                py: 2,
                                            }}
                                        >
                                            {column}
                                        </TableCell>
                                    ),
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginator.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        align="center"
                                        sx={{ color: "#6b7280", py: 5 }}
                                    >
                                        No available laptops found.
                                    </TableCell>
                                </TableRow>
                            )}

                            {paginator.data.map((laptop) => (
                                <TableRow
                                    key={laptop.id}
                                    hover
                                    selected={
                                        String(data.laptop_id) ===
                                        String(laptop.id)
                                    }
                                    onClick={() =>
                                        setData("laptop_id", laptop.id)
                                    }
                                    sx={{ cursor: "pointer" }}
                                >
                                    <TableCell sx={{ width: 56 }}>
                                        <input
                                            type="radio"
                                            className="h-4 w-4 accent-blue-600"
                                            checked={
                                                String(data.laptop_id) ===
                                                String(laptop.id)
                                            }
                                            value={laptop.id}
                                            onChange={() =>
                                                setData("laptop_id", laptop.id)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#64748b",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {laptop.kode}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            color: "#1f2937",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {laptop.nama}
                                    </TableCell>
                                    <TableCell sx={{ color: "#6b7280" }}>
                                        {laptop.spesifikasi ?? "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <PaginationFooter
                        currentPage={paginator.current_page}
                        lastPage={paginator.last_page}
                        total={paginator.total}
                        perPage={paginator.per_page}
                        label="assets"
                        onPageChange={(page) =>
                            visitCreate({ ...filters, search, page })
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
