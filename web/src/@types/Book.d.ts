export interface IStatus {
    booking_number: number;
    available: boolean;
    selected: boolean;
}

export interface INotAvailable {
    booking_number: number;
}

export interface IBook {
    type: string;
    booking_number: number;
    booking_day: string;
    period_id: number;
    user: number;
}

export interface IUpcomingBooking extends IBook {
    id: number;
    cancelBooking: () => {};
}

export interface ILastBooking extends IBook {
    id: number;
}