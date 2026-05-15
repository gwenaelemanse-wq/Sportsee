import {Outlet} from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function AppLayout() {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}