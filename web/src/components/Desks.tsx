import { Desktop } from "phosphor-react"
import { IStatus } from "./BookingTab"


export const Desks = (props: IStatus) => {
    let color = props.available ? "#e8e4e6" : "#e16162";
    color = props.selected && props.available ? "#f9bc60" : color

    let text_color = props.available ? "text-main" : "text-attention";
    text_color = props.selected && props.available ? "text-highlight" : text_color

    return (
        <div className={`relative ${props.available ? 'hover:cursor-pointer' : ''}`}>
            <p className={`absolute top-[13px] left-1/2 -translate-x-1/2 ${text_color}`}>{props.id}</p>
            <Desktop className="inline" size={70} color={color} weight="light" />
        </div>
    )
}
