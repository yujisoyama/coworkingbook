import { useUser } from "../context/UserContext";

export const Dashboard = () => {
    const { user } = useUser();

    return (
        <div className="bg-background w-screen h-screen mobileHome:h-full mobileHome:w-full mobileHome:bg-loginmobile">
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.fullname}</p>
            <p>{user.company}</p>
            <p>{user.role}</p>
        </div>
    )
}