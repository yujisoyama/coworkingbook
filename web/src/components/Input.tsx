import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    warning: string;
}

export function Input(props: InputProps) {
    const required:boolean = props.warning === 'true' ? true : false
    return (
        <input {...props} className={`border-none outline-none bg-main py-4 px-6 pl-14 rounded-full w-72 ${required ? 'bg-attention placeholder-background' : ''} `} />
    )
}