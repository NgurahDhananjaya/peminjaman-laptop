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
    return (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_270px_auto] md:items-end">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
                        {searchLabel}
                    </label>
                    <TextField
                        fullWidth
                        size="small"
                        value={search}
                        placeholder={searchPlaceholder}
                        onChange={(event) =>
                            onSearchChange?.(event.target.value)
                        }
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
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">
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
