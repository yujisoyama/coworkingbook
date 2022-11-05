import { PaperPlaneTilt } from "phosphor-react"
import { Link } from "react-router-dom";

interface ISignUpConfirmProps {
    fullName: string;
    email: string;
    backToSignUp: () => void;
}

export const SignUpConfirm = (props:ISignUpConfirmProps) => {
    return (
        <div>
            <div className="w-[550px] h-[375px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignupConfirm:w-[350px] mobileSignupConfirm:h-[450px]">
                <div className="w-full">
                    <PaperPlaneTilt className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                    <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5 mb-5">Almost there...</h1>
                    <p className="font-open px-3 text-secondary font-bold mt-3">Hi {props.fullName},</p>
                    <p className="font-open px-3 text-secondary font-bold mt-3">Please check your email to confirm your account.</p>
                    <p className="font-open px-3 text-secondary font-bold mt-3 mobileSignupConfirm:w-[286px] mobileSignupConfirm:break-all">
                        If <span className="text-main">{props.email}</span> is not your email address, please <button onClick={props.backToSignUp} className="text-secondary underline hover:text-main">go back</button> and enter the correct one.
                    </p>
                    <p className="font-open px-3 text-secondary font-bold mt-6 text-right"><Link to="/" className="text-secondary underline hover:text-main">Return to Log in page</Link> </p>
                </div>
            </div>
        </div>
    )
}
