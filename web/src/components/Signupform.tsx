import { EnvelopeSimple, Lock, NotePencil, IdentificationCard, Buildings, ShareNetwork, PaperPlaneTilt } from "phosphor-react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Input } from "./Input"
import { FormEvent, useState } from "react";

import { createAccount } from "../utils/createAccount";
import { checkEmailAlreadyUsing } from "../utils/checkEmailAlreadyUsing";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUpForm = () => {

    const [requiredFullName, setRequireFullName] = useState<string>('false');
    const [requiredEmail, setRequireEmail] = useState<string>('false');
    const [requiredPassword, setRequirePassword] = useState<string>('false');
    const [formEmail, setFormEmail] = useState<string>('');
    const [formFullName, setFormFullName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    let timer: number;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        timer = setTimeout(() => formValidate(form), 2000);
    }

    const formValidate = async (form: { [k: string]: FormDataEntryValue; }) => {
        if (form.fullname === "" || form.email === "" || form.email.toString().indexOf('@') === -1 || form.password === "") {
            if (form.fullname === "") {
                setRequireFullName('true');
            } else {
                setRequireFullName('false');
            }

            if (form.email === "") {
                setRequireEmail('true');
            } else {
                setRequireEmail('false');
            }

            if (form.email.toString().indexOf('@') === -1) {
                setRequireEmail('true');
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
                setRequireEmail('false');
            }

            if (form.password === "") {
                setRequirePassword('true');
            } else {
                setRequirePassword('false');
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
            setRequireFullName('false');
            setRequireEmail('false');
            setRequirePassword('false');
            try {
                if (await checkEmailAlreadyUsing(form)) {
                    toast.warn('This mail already being used', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setRequireEmail('true');
                    clearTimeout(timer);
                    setIsSubmitting(false);
                } else {
                    await createAccount(form);
                    clearTimeout(timer);
                    setFormEmail(form.email.toString());
                    setFormFullName(form.fullname.toString());
                    setIsSubmitting(false);
                    setFormSubmitted(true);
                }
            } catch (error) {
                console.log(error);
                clearTimeout(timer);
                setIsSubmitting(false);
            }
        }
    }

    const backToSignUp = () => {
        setFormSubmitted(false);
    }

    return (
        <div>
            {formSubmitted ? (
                <div>
                    <div className="w-[550px] h-[375px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignupConfirm:w-[350px] mobileSignupConfirm:h-[450px]">
                        <div className="w-full">
                            <PaperPlaneTilt className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                            <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5 mb-5">Almost there...</h1>
                            <p className="font-open px-3 text-secondary font-bold mt-3">Hi {formFullName},</p>
                            <p className="font-open px-3 text-secondary font-bold mt-3">Please check your email to confirm your account.</p>
                            <p className="font-open px-3 text-secondary font-bold mt-3 mobileSignupConfirm:w-[286px] mobileSignupConfirm:break-all">
                                If <span className="text-main">{formEmail}</span> is not your email address, please <button onClick={backToSignUp} className="text-secondary underline hover:text-main">go back</button> and enter the correct one.
                            </p>
                            <p className="font-open px-3 text-secondary font-bold mt-6 text-right"><Link to="/" className="text-secondary underline hover:text-main">Return to Log in page</Link> </p>
                        </div>
                    </div>
                </div>
            ) : (
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
                                <Input name="role" id="role" type='text' placeholder="Role" warning={'false'} />
                            </div>
                            <button disabled={isSubmitting} className={`w-36 mx-auto h-12 rounded-full font-extrabold from-buttonText ${isSubmitting ? 'bg-disabled scale-105' : 'bg-highlight hover:bg-[#FFB340] hover:scale-105 duration-300'}`} type="submit">
                                {isSubmitting ? <ThreeDots
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
            )}
        </div>
    )
}


