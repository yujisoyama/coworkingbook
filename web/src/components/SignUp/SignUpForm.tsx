import { EnvelopeSimple, IdentificationCard, NotePencil, Lock, Buildings, ShareNetwork } from "phosphor-react"
import { FormEvent } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Input } from "../Input"

interface ISignUpFormProps {
    requiredFullName: string;
    requiredEmail: string;
    requiredPassword: string;
    isSubmitting: boolean;
    handleSubmit: (event: FormEvent) => void;
}

export const SignUpForm = (props: ISignUpFormProps) => {
    return (
        <div className="w-[400px] h-[660px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignup:w-[350px]">
            <div className="">
                <NotePencil className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Sign Up</h1>
            </div>
            <div>
                <form onSubmit={props.handleSubmit} className="mt-6 flex flex-col gap-5 relative">
                    <div className="relative mx-auto">
                        <span><IdentificationCard className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="fullname" id="fullname" type='text' placeholder="Full name*" warning={props.requiredFullName} />
                    </div>
                    <div className="relative mx-auto">
                        <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="email" id="email" type='text' placeholder="Email*" warning={props.requiredEmail} />
                    </div>
                    <div className="relative mx-auto">
                        <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="password" id="password" type='password' placeholder="Password*" warning={props.requiredPassword} />
                    </div>
                    <div className="relative mx-auto">
                        <span><Buildings className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="company" id="company" type='text' placeholder="Company" warning={'false'} />
                    </div>
                    <div className="relative mx-auto">
                        <span><ShareNetwork className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="role" id="role" type='text' placeholder="Role" warning={'false'} />
                    </div>
                    <button disabled={props.isSubmitting} className={`w-36 mx-auto h-12 rounded-full font-extrabold ${props.isSubmitting ? 'bg-disabled scale-105' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} type="submit">
                        {props.isSubmitting ? <ThreeDots
                            height="20"
                            width="40"
                            radius="2"
                            color="#001e1d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{ justifyContent: "center" }}
                            visible={true}
                        /> : 'Sign up'}
                    </button>
                </form>
                <div className="mt-5 text-sm text-secondary font-semibold ml-14 font-open mobileSignup:ml-7">
                    <p className="inline">Already have an account?</p> <Link to="/" className="text-main hover:underline">Log in!</Link>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
