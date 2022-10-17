import { Link } from "react-router-dom"
import workGif from "../../assets/work.gif"
import { BriefcaseMetal, EnvelopeSimple, Lock } from 'phosphor-react'
import { Input } from "../components/Input"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FormEvent } from "react"

export const Home = () => {

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
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileHome:h-full mobileHome:w-full mobileHome:bg-loginmobile">
            <div className="h-5/6 pt-10 flex justify-center items-center mobileHome:flex-col mobileHome:h-auto" >
                <div className="mt-5 w-[40rem] mobileHome:w-[400px]">
                    <h1 className="text-4xl text-highlight font-open font-bold mobileHome:pl-4">Coworking Book</h1>
                    <p className="mt-5 text-lg font-open font-semibold text-paragraph mobileHome:pl-4 pr-4">Platform to simplify the booking for desks or meeting rooms in coworking spaces</p>
                    <img src={workGif} alt="gif" className="block w-96 h-96 mt-10 mr-auto ml-auto mobileHome:mt-3" />
                </div>
                <div className="w-[400px] h-[510px] p-8 opacity-95 rounded-[30px] bg-backgroundLight relative before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileHome:mt-10 mobileHome:mb-[90px] mobileHome:w-[350px] mobileHome:h-[510px]">
                    <div className="">
                        <BriefcaseMetal className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                        <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Log in</h1>
                        <p className="font-open text-secondary text-center font-bold mt-3">Please login to use the platform</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 relative">
                            <div className="relative mx-auto">
                                <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                                <Input type='text' placeholder="Email" />
                            </div>
                            <div className="relative mx-auto">
                                <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                                <Input type='password' placeholder="Password" />
                            </div>
                            <div className="w-40 ml-[11.5rem] mobileHome:ml-[10rem]">
                                <a onClick={handleSubmit} className="font-open font-semibold text-sm hover:underline text-main" href="#">Forgot password?</a>
                            </div>
                            <button className="w-36 mx-auto h-12 rounded-full font-extrabold hover:bg-[#FFB340] hover:scale-105 duration-300 from-buttonText bg-highlight" type="submit">Log in</button>
                        </form>
                        <div className="mt-5 text-sm text-secondary font-semibold ml-9 font-open mobileHome:ml-3">
                            <p className="inline">New to the platform?</p> <Link to="/signup" className="text-main hover:underline">Sign Up for free!</Link>
                        </div>
                    </div>
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
