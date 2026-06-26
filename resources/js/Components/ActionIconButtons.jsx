import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton } from '@mui/material';

const buttonSx = {
    color: '#a8b0c2',
    '&:hover': {
        bgcolor: '#f3f6fb',
        color: '#2563eb',
    },
};

export default function ActionIconButtons({ onView, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-end gap-1">
            <IconButton size="small" onClick={onView} disabled={!onView} sx={buttonSx} aria-label="View">
                <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onEdit} disabled={!onEdit} sx={buttonSx} aria-label="Edit">
                <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} disabled={!onDelete} sx={buttonSx} aria-label="Delete">
                <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
        </div>
    );
}
