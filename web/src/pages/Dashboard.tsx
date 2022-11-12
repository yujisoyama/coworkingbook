import { DashboardTabs } from "../components/Dashboard/DashboardTabs"
import { Header } from "../components/Dashboard/Header"

export const Dashboard = () => {
    return (
        <div className="bg-background bg-cover w-screen h-screen overflow-y-auto">
            <Header />
            <DashboardTabs />
        </div>
    )
}