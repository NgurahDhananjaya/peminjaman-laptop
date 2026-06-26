export const LaptopStatus = {
    TERSEDIA: 'Tersedia',
    DIPINJAM: 'Dipinjam',
};

export const LaptopStatusMeta = {
    [LaptopStatus.TERSEDIA]: {
        label: 'Available',
        color: '#15803d',
        background: '#dcfce7',
    },
    [LaptopStatus.DIPINJAM]: {
        label: 'On Loan',
        color: '#1d4ed8',
        background: '#dbeafe',
    },
};
