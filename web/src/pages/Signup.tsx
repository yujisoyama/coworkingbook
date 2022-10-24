import { SignUpForm } from "../components/Signupform";

export const SignUp = () => {

    return (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
            <div className="flex justify-center h-full items-center" >
                <SignUpForm />
            </div>
        </div>
    )
}
