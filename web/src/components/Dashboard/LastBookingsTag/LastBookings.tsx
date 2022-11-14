import { ILastBooking } from "../../../@types/Book"

export const LastBookings = (props: ILastBooking) => {
    const date: string = props.booking_day.split('T')[0];
    let period: string = '';
    switch (props.period_id) {
        case 1:
            period = 'Morning';
            break;
        case 2:
            period = 'Afternoon';
            break;
        case 3:
            period = 'Full Day';
            break;
    }

    return (
        <div className="w-full h-20 flex flex-row justify-between items-center border-b border-paragraph text-base
            upcomingTabMobile:text-xs
            upcomingTabMobile:h-12">
            <div className="flex flex-row justify-between gap-3">
                <p className="text-center">Type: <span className="text-highlight">{props.type.toUpperCase()}</span></p>
                <p className="text-center">N°: <span className="text-highlight">{props.booking_number}</span></p>
                <p className="text-center">Day: <span className="text-highlight">{date}</span></p>
                <p className="text-center">Period: <span className="text-highlight">{period}</span></p>
            </div>
        </div>
    )
}