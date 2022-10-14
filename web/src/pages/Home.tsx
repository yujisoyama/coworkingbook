import { Link } from "react-router-dom"
import workGif from "../../assets/work.gif"

export const Home = () => {
  return (
    <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobile:h-full mobile:w-full mobile:bg-loginmobile">
        <div className="h-5/6 pt-10 flex justify-center items-center mobile:flex-col mobile:h-auto" >
            <div className="mt-5 w-[40rem] mobile:w-[400px]">
                <h1 className="text-4xl text-highlight font-open font-bold">Coworking Book</h1>
                <p className="mt-5 text-lg font-open font-semibold text-paragraph text-">Platform to simplify the booking for desks or meeting rooms in coworking spaces</p>
                <img src={workGif} alt="gif" className="block w-96 h-96 mt-10 mr-auto ml-auto" />
            </div>
            <div className="w-[400px] h-[450px] bg-secondary">
                <p>Login</p>
            </div>
        </div>
    </div>
  )
}
