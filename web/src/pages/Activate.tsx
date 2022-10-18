import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { api } from "../Api";

export const Activate = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const { userUuid } = useParams();

  useEffect(() => {
    confirmAccount();
  })

  const confirmAccount = async () => {
    try {
      await api.put(`/user/active/${userUuid}`).then((res) => {
        if (res.data.confirmed) {
          setConfirmed(true);
        } else {
          setConfirmed(false);
        }
      })
      console.log(confirmed);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {confirmed ? (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
          <div className="flex justify-center h-full items-center" >
            <div className="w-[550px] h-[250px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignupConfirm:w-[350px] mobileSignupConfirm:h-[280px]">
              <div className="w-full">
                <CheckCircle className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5 mb-5">This account is already confirmed.</h1>
                <p className="font-open px-3 text-secondary font-bold mt-6 text-center"><Link to="/" className="text-secondary underline hover:text-main">Return to Log in page</Link> </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-login bg-cover bg-no-repeat w-screen h-screen mobileSignup:bg-loginmobile">
          <div className="flex justify-center h-full items-center" >
            <div className="w-[550px] h-[265px] self-center p-8 opacity-95 rounded-[30px] bg-backgroundLight relative  before:content-[''] before:absolute before:bg-secondary before:opacity-10 before:inset-0 before:-rotate-[4deg] before:-z-10 before:rounded-[30px] mobileSignupConfirm:w-[350px] mobileSignupConfirm:h-[260px]">
              <div className="w-full">
                <CheckCircle className="mr-auto ml-auto mt-2" color="#e8e4e6" size={45} weight={"bold"} />
                <h1 className="font-open text-main text-center font-extrabold text-3xl mt-5 mb-5">Account confirmed!</h1>
                <p className="font-open px-3 text-secondary font-bold mt-3 text-center">Thank you! Feel free to use the platform. Hope you enjoy!</p>
                <p className="font-open px-3 text-secondary font-bold mt-6 text-center"><Link to="/" className="text-secondary underline hover:text-main">Return to Log in page</Link> </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
