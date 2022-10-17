import { EnvelopeSimple, Lock, NotePencil, IdentificationCard, Buildings, ShareNetwork } from "phosphor-react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Input } from "../components/Input"
import { FormEvent, useState } from "react";
import { api } from "../Api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signupform = () => {

    const [requiredFullName, setRequireFullName] = useState<string>('false');
    const [requiredEmail, setRequireEmail] = useState<string>('false');
    const [requiredPassword, setRequirePassword] = useState<string>('false');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    let timer:number;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        timer = setTimeout(() => formValidate(data), 1500)
    }

    const formValidate = (data: { [k: string]: FormDataEntryValue; }) => {
        if (data.fullname === "" || data.email === "" || data.email.toString().indexOf('@') === -1 || data.password === "") {
            if (data.fullname === "") {
                setRequireFullName('true')
            } else {
                setRequireFullName('false')
            }

            if (data.email === "") {
                setRequireEmail('true')
            } else {
                setRequireEmail('false')
            }

            if (data.email.toString().indexOf('@') === -1) {
                setRequireEmail('true')
                toast.warn('Insert a valid email ("@" is missing)', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            } else {
                setRequireEmail('false')
            }

            if (data.password === "") {
                setRequirePassword('true')
            } else {
                setRequirePassword('false')
            }
            toast.warn('Fill the required fileds!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setIsSubmitting(false);
        } else {
            setRequireFullName('false')
            setRequireEmail('false')
            setRequirePassword('false')
            SignUp(data);
        }
    }

    const SignUp = async (data: { [k: string]: FormDataEntryValue; }) => {
        try {
            await api.post('/user', {
                fullname: data.fullname,
                email: data.email,
                password: data.password,
                company: data.company,
                role: data.role
            })
            console.log(data)
            alert('User created!')
            clearTimeout(timer);
            setIsSubmitting(false);
        } catch (err) {
            console.log(err);
            alert('Error on creating user')
            clearTimeout(timer);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-[400px] h-[660px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignup:w-[350px]">
            <div className="">
                <NotePencil className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Sign Up</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 relative">
                    <div className="relative mx-auto">
                        <span><IdentificationCard className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="fullname" id="fullname" type='text' placeholder="Full name*" warning={requiredFullName} />
                    </div>
                    <div className="relative mx-auto">
                        <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="email" id="email" type='text' placeholder="Email*" warning={requiredEmail} />
                    </div>
                    <div className="relative mx-auto">
                        <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="password" id="password" type='password' placeholder="Password*" warning={requiredPassword} />
                    </div>
                    <div className="relative mx-auto">
                        <span><Buildings className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="company" id="company" type='text' placeholder="Company" warning={'false'} />
                    </div>
                    <div className="relative mx-auto">
                        <span><ShareNetwork className="inline absolute top-4 left-5" size={24} /></span>
                        <Input name="role" id="role" type='password' placeholder="Role" warning={'false'} />
                    </div>
                    <button disabled={isSubmitting} className={`w-36 mx-auto h-12 rounded-full font-extrabold from-buttonText ${isSubmitting ? 'bg-disabled scale-105' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} type="submit">
                        {isSubmitting ? <ThreeDots 
                                            height="20" 
                                            width="40" 
                                            radius="2"
                                            color="#001e1d"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{justifyContent: "center"}}
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


