import { Trash } from "phosphor-react"
import { IUpcomingBooking } from "../../../@types/Book"

export const UpcomingBookings = (props: IUpcomingBooking) => {
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
            upcomingTabMobile:text-xs">
            <div className="flex flex-row justify-between gap-6 
                upcomingTabMobile:flex-col 
                upcomingTabMobile:gap-0 
                upcomingTabMobile:w-3/4 
                upcomingTabMobile:items-start">
                <p className="text-center">Type: <span className="text-highlight">{props.type.toUpperCase()}</span></p>
                <p className="text-center">N°: <span className="text-highlight">{props.booking_number}</span></p>
                <p className="text-center">Day: <span className="text-highlight">{date}</span></p>
                <p className="text-center">Period: <span className="text-highlight">{period}</span></p>
            </div>
            <button onClick={props.cancelBooking} className="flex flex-row gap-1 justify-center items-center bg-attentionBackground rounded-lg p-2 text-background border border-attention">
                Cancel Booking
                <Trash size={25} weight="bold" color="#e16162" />
            </button>
        </div>
    )
}
