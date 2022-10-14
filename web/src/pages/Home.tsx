import { Link } from "react-router-dom"
import workGif from "../../assets/work.gif"
import { BriefcaseMetal, EnvelopeSimple, Lock } from 'phosphor-react'
import { Input } from "../components/Input"

export const Home = () => {
  return (
    <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobile:h-full mobile:w-full mobile:bg-loginmobile">
        <div className="h-5/6 pt-10 flex justify-center items-center mobile:flex-col mobile:h-auto" >
            <div className="mt-5 w-[40rem] mobile:w-[400px]">
                <h1 className="text-4xl text-highlight font-open font-bold">Coworking Book</h1>
                <p className="mt-5 text-lg font-open font-semibold text-paragraph">Platform to simplify the booking for desks or meeting rooms in coworking spaces</p>
                <img src={workGif} alt="gif" className="block w-96 h-96 mt-10 mr-auto ml-auto" />
            </div>
            <div className="w-[400px] h-[510px] p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobile:mt-10 mobile:mb-[90px] mobile:w-[350px] mobile:h-[525px]">
                <div>
                    <div className="">
                        <BriefcaseMetal className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"}/>
                        <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5">Sign In</h1>
                        <p className="font-open text-secondary text-center font-bold mt-3">Please login to use the platform</p>
                    </div>
                    <div>
                        <form className="mt-6 flex flex-col gap-5 relative">
                            <div className="relative mx-auto">
                                <span><EnvelopeSimple className="inline absolute top-4 left-5" size={24} /></span>
                                <Input type='text' placeholder="Email" />
                            </div>
                            <div className="relative mx-auto">
                                <span><Lock className="inline absolute top-4 left-5" size={24} /></span>
                                <Input type='password' placeholder="Password" />
                            </div>
                            <div className="w-40 ml-[11.5rem] mobile:ml-[10rem]">
                                <a className="font-open font-semibold text-sm hover:underline text-main" href="#">Forgot password?</a>
                            </div>
                            <button className="w-36 mx-auto h-12 rounded-full font-extrabold hover:bg-[#FFB340] hover:scale-105 duration-300 from-buttonText bg-highlight" type="submit">Sign In</button>
                        </form>
                        <div className="mt-5 text-sm text-secondary font-semibold ml-2 font-open">
                            <p className="inline mobile:block mobile:text-center">Don't have an account?</p> <a className="text-main hover:underline mobile:block mobile:w-40 mobile:mx-auto" href="#">Create a free account!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
