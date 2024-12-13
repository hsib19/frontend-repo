import { Metadata } from "next";
import LoginPage from "./page"; 

export const metadata: Metadata = {
    title: 'Login',
};

export default function PageLayout() {
    return (<LoginPage />)
};