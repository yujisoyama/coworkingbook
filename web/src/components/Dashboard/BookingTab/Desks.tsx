import { Desktop } from "phosphor-react"
import { useEffect, useState } from "react";
import { IStatus } from "../../../@types/Book";

export const Desks = (props: IStatus) => {
    const [iconSize, setIconSize] = useState<number>();

    const changeIconSize = () => {
        if (window.innerWidth <= 615) {
            setIconSize(50);
        } else {
            setIconSize(70);
        } 
    }

    useEffect(() => {
        changeIconSize();
        window.addEventListener('resize', () => {
            changeIconSize();
        });
    }, [])

    let color = props.available ? "#e8e4e6" : "#e16162";
    color = props.selected && props.available ? "#f9bc60" : color

    let text_color = props.available ? "text-main" : "text-attention";
    text_color = props.selected && props.available ? "text-highlight" : text_color

    return (
        <div className={`relative ${props.available ? 'hover:cursor-pointer' : ''} bookingTabMobile:`}>
            <p className={`absolute top-[13px] left-1/2 -translate-x-1/2 ${text_color} bookingTabMobile:top-[6px]`}>{props.booking_number}</p>
            <Desktop className="inline" size={iconSize} color={color} weight="light" />
        </div>
    )
}
