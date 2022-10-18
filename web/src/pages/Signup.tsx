import { Signupform } from "../components/Signupform";

export const Signup = () => {

    return (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
            <div className="flex justify-center h-full items-center" >
                    <Signupform />
            </div>
        </div>
    )
}
