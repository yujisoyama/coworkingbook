import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { Loading } from "./Dashboard/Loading";

export const PrivateRoutes = () => {
    const { token, authenticated, getProfile } = useUser();
    let timer: number;
    useEffect(() => {
        timer = window.setTimeout(() => getProfile(token), 2000);
    }, [authenticated])

    if (authenticated === undefined) {
        return (
            <div className="bg-login bg-cover bg-no-repeat w-full h-screen mobileHome:bg-loginmobile">
                <Loading />
            </div>
        )
    }

    return authenticated ? <Outlet /> : <Navigate to="/" />
}
