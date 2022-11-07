import { useEffect } from "react"
import { useUser } from "../context/UserContext";

export const Dashboard = () => {
    const { user, token, getProfile } = useUser();

    useEffect(() => {
        getProfile(token);
    }, [])

    return (
        <div>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.fullname}</p>
            <p>{user.company}</p>
            <p>{user.role}</p>
        </div>
    )
}