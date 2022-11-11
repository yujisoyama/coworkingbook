import { Buildings } from "phosphor-react"
import { useUser } from "../context/UserContext";
import { Settings } from "./Settings"


export const Header = () => {
  const { user } = useUser();

  return (
    <div className="bg-backgroundLight px-3 h-16 font-open flex flex-row items-center" >
      <Settings />
      <div className="ml-2 text-xl font-bold text-paragraph mobile:text-lg" >
        {user.fullname}
      </div>
    </div>
  )
}
