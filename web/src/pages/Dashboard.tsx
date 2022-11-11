import { DashboardTabs } from "../components/DashboardTabs"
import { Header } from "../components/Header"

export const Dashboard = () => {
    return (
        <div className="bg-background bg-cover w-screen h-screen overflow-y-auto">
            <Header />
            <DashboardTabs />
        </div>
    )
}