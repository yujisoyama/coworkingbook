import { HomeInformation } from "../components/Home/HomeInformation"
import { LoginForm } from "../components/Home/LoginForm"

export const Home = () => {
    return (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileHome:h-full mobileHome:w-full mobileHome:bg-loginmobile">
            <div className="h-5/6 pt-10 flex justify-center items-center mobileHome:flex-col mobileHome:h-auto" >
                <HomeInformation />
                <LoginForm />
            </div>
        </div>
    )
}

