import ActionIconButtons from "@/Components/ActionIconButtons";
import PaginationFooter from "@/Components/PaginationFooter";
import SearchFilterToolbar from "@/Components/SearchFilterToolbar";
import StatusChip from "@/Components/StatusChip";
import { LaptopStatus } from "@/Enums/laptopStatus";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

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

export default function LaptopIndex({ data, filters = {}, statuses }) {
    const paginator = data ?? emptyPaginator;
    const laptopStatuses = statuses?.length
        ? statuses
        : Object.values(LaptopStatus);

    const visitIndex = (params) => {
        router.get(route("laptop.index"), cleanParams(params), {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (laptop) => {
        if (window.confirm(`Delete ${laptop.nama}?`)) {
            router.delete(route("laptop.destroy", laptop.id));
        }
    };

    return (
        <AppLayout activeTab="laptop">
            <Head title="Laptops" />

            <SearchFilterToolbar
                search={filters.search ?? ""}
                status={filters.status ?? ""}
                statuses={laptopStatuses}
                buttonLabel="New Asset"
                searchPlaceholder="Search by name, ID or code..."
                onSearchChange={(search) =>
                    visitIndex({ ...filters, search, page: 1 })
                }
                onStatusChange={(status) =>
                    visitIndex({ ...filters, status, page: 1 })
                }
                onButtonClick={() => router.visit(route("laptop.create"))}
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f3f4f6" }}>
                            {["ID", "CODE", "NAME", "STATUS", "TOOLS"].map(
                                (column) => (
                                    <TableCell
                                        key={column}
                                        align={
                                            column === "TOOLS"
                                                ? "right"
                                                : "left"
                                        }
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
                                    colSpan={5}
                                    align="center"
                                    sx={{ color: "#6b7280", py: 5 }}
                                >
                                    No laptops found.
                                </TableCell>
                            </TableRow>
                        )}

                        {paginator.data.map((laptop) => (
                            <TableRow key={laptop.id} hover>
                                <TableCell
                                    sx={{ color: "#374151", fontWeight: 700 }}
                                >
                                    {`#LT-${String(laptop.id).padStart(3, "0")}`}
                                </TableCell>
                                <TableCell
                                    sx={{ color: "#64748b", fontWeight: 700 }}
                                >
                                    {laptop.kode}
                                </TableCell>
                                <TableCell>
                                    <p className="font-semibold text-slate-800">
                                        {laptop.nama}
                                    </p>
                                    {laptop.spesifikasi && (
                                        <p className="mt-1 text-xs text-slate-400">
                                            {laptop.spesifikasi}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <StatusChip status={laptop.status} />
                                </TableCell>
                                <TableCell align="right">
                                    <ActionIconButtons
                                        onView={() =>
                                            router.visit(
                                                route("laptop.show", laptop.id),
                                            )
                                        }
                                        onEdit={() =>
                                            router.visit(
                                                route("laptop.edit", laptop.id),
                                            )
                                        }
                                        onDelete={() => handleDelete(laptop)}
                                    />
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
                    onPageChange={(page) => visitIndex({ ...filters, page })}
                />
            </div>
        </AppLayout>
    );
}
