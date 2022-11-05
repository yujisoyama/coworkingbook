import { EnvelopeSimple, Lock, NotePencil, IdentificationCard, Buildings, ShareNetwork, PaperPlaneTilt } from "phosphor-react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { createAccount } from "../utils/createAccount";
import { checkEmailAlreadyUsing } from "../utils/checkEmailAlreadyUsing";
import { Input } from "../components/Input";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inputEmpty, verifyEmail } from "../utils/formValidate";
import { SignUpConfirm } from "../components/SignUpConfirm";
import { SignUpForm } from "../components/SignUpForm";

export const SignUp = () => {
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
        timer = setTimeout(() => formValidate(form), 1000);
    }

    const formValidate = async (form: { [k: string]: FormDataEntryValue; }) => {
        if (form.fullname === "" || form.email === "" || form.email.toString().indexOf('@') === -1 || form.password === "") {
            setRequireFullName(inputEmpty(form.fullname.toString()));
            setRequireEmail(inputEmpty(form.email.toString()));
            setRequirePassword(inputEmpty(form.password.toString()));
            setRequireEmail(verifyEmail(form.email.toString()));

            if (verifyEmail(form.email.toString()) === 'true') {
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
                toast.error('Something went wrong, try again later.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }

    const backToSignUp = () => {
        setFormSubmitted(false);
    }

    return (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
            <div className="flex justify-center h-full items-center" >
                <div>
                    {formSubmitted ? (
                        <SignUpConfirm fullName={formFullName} email={formEmail} backToSignUp={backToSignUp} />
                    ) : (
                        <SignUpForm requiredFullName={requiredFullName} requiredEmail={requiredEmail} requiredPassword={requiredPassword} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </div>
    )
}
