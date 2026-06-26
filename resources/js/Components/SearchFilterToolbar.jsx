import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
    Button,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function SearchFilterToolbar({
    search = "",
    status = "",
    statuses = [],
    buttonLabel,
    searchLabel = "Search Inventory",
    searchPlaceholder = "Search...",
    statusLabel = "Filter Status",
    onSearchChange,
    onStatusChange,
    onButtonClick,
}) {
    const [draftSearch, setDraftSearch] = useState(search);

    useEffect(() => {
        setDraftSearch(search);
    }, [search]);

    const submitSearch = () => {
        onSearchChange?.(draftSearch);
    };

    return (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_270px_auto] md:items-end">
                <div className="md:border-r md:border-slate-200 md:pr-4">
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                        {searchLabel}
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <TextField
                            fullWidth
                            size="small"
                            value={draftSearch}
                            placeholder={searchPlaceholder}
                            onChange={(event) =>
                                setDraftSearch(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    submitSearch();
                                }
                            }}
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
                        />
                        <Button
                            variant="outlined"
                            startIcon={<SearchIcon />}
                            onClick={submitSearch}
                            sx={{
                                height: 40,
                                minWidth: 110,
                                textTransform: "none",
                                fontWeight: 700,
                            }}
                        >
                            Search
                        </Button>
                    </div>
                </div>

                <div className="md:border-r md:pr-4 md:border-slate-200">
                    <label className="mb-2 block text-sm font-semibold text-slate-600 ">
                        {statusLabel}
                    </label>
                    <FormControl fullWidth size="small">
                        <Select
                            displayEmpty
                            value={status}
                            onChange={(event) =>
                                onStatusChange?.(event.target.value)
                            }
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            {statuses.map((item) => {
                                const value =
                                    typeof item === "string"
                                        ? item
                                        : item.value;
                                const label =
                                    typeof item === "string"
                                        ? item
                                        : item.label;

                                return (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className="flex md:justify-end">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={onButtonClick}
                        sx={{
                            minWidth: 160,
                            height: 40,
                            borderRadius: 1,
                            boxShadow: "none",
                            fontWeight: 800,
                            textTransform: "none",
                            marginTop: "auto",
                        }}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
