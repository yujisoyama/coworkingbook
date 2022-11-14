import { Trash } from "phosphor-react"
import { IBook, IUpcomingBooking } from "../../../@types/Book"

export const UpcomingBookings = (props: IUpcomingBooking) => {
    return (
        <div className="w-full h-20 flex flex-row justify-between items-center border-b border-paragraph text-base">
            <div className="flex flex-row justify-between gap-6">
                <p className="text-center">Type: <span className="text-highlight">{props.type}</span></p>
                <p className="text-center">Number: <span className="text-highlight">{props.booking_number}</span></p>
                <p className="text-center">Day: <span className="text-highlight">{props.booking_day}</span></p>
                <p className="text-center">Period: <span className="text-highlight">{props.period_id}</span></p>
            </div>
            <button onClick={props.cancelBooking} className="flex flex-row gap-1 justify-center items-center bg-attentionBackground rounded-lg p-2 text-background border border-attention">
                Cancel Booking
                <Trash size={25} weight="bold" color="#e16162" />
            </button>

        </div>
    )
}
