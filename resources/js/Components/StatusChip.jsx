import { Chip } from '@mui/material';
import { LaptopStatusMeta } from '@/Enums/laptopStatus';

const loanStatusMeta = {
    'Sedang Dipinjam': {
        label: 'Sedang Dipinjam',
        color: '#1d4ed8',
        background: '#dbeafe',
    },
    'Sudah Dikembalikan': {
        label: 'Sudah Dikembalikan',
        color: '#15803d',
        background: '#dcfce7',
    },
};

export default function StatusChip({ status }) {
    const value = typeof status === 'object' && status !== null
        ? status.value ?? status.label ?? status.name
        : status;
    const meta = LaptopStatusMeta[value] ?? loanStatusMeta[value] ?? {
        label: value || 'Unknown',
        color: '#4b5563',
        background: '#f3f4f6',
    };

    return (
        <Chip
            label={meta.label}
            size="small"
            sx={{
                bgcolor: meta.background,
                color: meta.color,
                fontWeight: 700,
                height: 24,
                borderRadius: '999px',
                '& .MuiChip-label': {
                    px: 1.25,
                },
            }}
        />
    );
}
