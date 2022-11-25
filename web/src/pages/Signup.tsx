import { FormEvent, useState } from "react";

import { createAccount } from "../utils/createAccount";
import { checkEmailAlreadyUsing } from "../utils/checkEmailAlreadyUsing";
import { inputEmpty, verifyEmail } from "../utils/formValidate";
import { SignUpConfirm } from "../components/SignUp/SignUpConfirm";
import { SignUpForm } from "../components/SignUp/SignUpForm";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        timer = window.setTimeout(() => formValidate(form), 1000);
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

            toast.warn('Fill the required fields!', {
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
            //return;
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
