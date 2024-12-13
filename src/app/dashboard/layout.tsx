import { Metadata } from "next";
import DashboardPage from "./page";  

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function PageLayout() {
    return (<DashboardPage />)
};