import { Presentation } from "phosphor-react"
import { IStatus } from "./BookingTab"

export const MeetingRooms = (props: IStatus) => {
    let color = props.available ? "#e8e4e6" : "#e16162";
    color = props.selected && props.available ? "#f9bc60" : color

    let text_color = props.available ? "text-main" : "text-attention";
    text_color = props.selected && props.available ? "text-highlight" : text_color

    return (
        <div className={`relative ${props.available ? 'hover:cursor-pointer' : ''}`}>
            <p className={`absolute top-[18px] left-1/2 -translate-x-1/2 ${text_color}`}>{props.booking_number}</p>
            <Presentation className="inline" size={70} color={color} weight="light" />
        </div>
    )
}
