import { BriefcaseMetal, EnvelopeSimple, Lock, NotePencil, IdentificationCard, Buildings, ShareNetwork } from "phosphor-react"
import { Link } from "react-router-dom"
import { Input } from "../components/Input"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FormEvent } from "react";

export const Signup = () => {

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        toast.error('Not implemented yet!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    return (
    <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
        <div className="flex justify-center h-full items-center" >
            <div className="w-[400px] h-[690px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignup:w-[350px]">
                <div className="">
                    <NotePencil className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                    <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Sign Up</h1>
                    <p className="font-open text-secondary text-center font-bold mt-3">Please login to use the platform</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 relative">
                        <div className="relative mx-auto">
                            <span><IdentificationCard className="inline absolute top-4 left-5" size={24} /></span>
                            <Input type='text' placeholder="Full name*" />
                        </div>
                        <div className="relative mx-auto">
                            <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                            <Input type='text' placeholder="Email*" />
                        </div>
                        <div className="relative mx-auto">
                            <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                            <Input type='password' placeholder="Password*" />
                        </div>
                        <div className="relative mx-auto">
                            <span><Buildings className="inline absolute top-4 left-5" size={24} /></span>
                            <Input type='text' placeholder="Company" />
                        </div>
                        <div className="relative mx-auto">
                            <span><ShareNetwork className="inline absolute top-4 left-5" size={24} /></span>
                            <Input type='password' placeholder="Role" />
                        </div>
                        <button className="w-36 mx-auto h-12 rounded-full font-extrabold hover:bg-[#FFB340] hover:scale-105 duration-300 from-buttonText bg-highlight" type="submit">Sign Up</button>
                    </form>
                    <div className="mt-5 text-sm text-secondary font-semibold ml-14 font-open mobileSignup:ml-7">
                        <p className="inline">Already have an account?</p> <Link to="/" className="text-main hover:underline">Log in!</Link>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer
                position="top-right"
                autoClose={3000}
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
