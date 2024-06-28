import { create } from 'zustand';

interface DateRangeState {
    rangeDate: {
        from: Date;
        to: Date;
    };
    setRangeDate: (rangeDate: { from: Date; to: Date }) => void;
}

export const useDateStore = create<DateRangeState>((set) => ({
    rangeDate: {
        from: new Date('2024-01-01'),
        to: new Date('2024-12-31'),
    },
    setRangeDate: (rangeDate) => set({ rangeDate }),
}));
