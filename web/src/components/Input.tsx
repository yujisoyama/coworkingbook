import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input (props: InputProps) {
    return (
        <input
            {...props}
            className='border-none outline-none bg-main py-4 px-6 pl-14 rounded-full w-72' />
    )
}