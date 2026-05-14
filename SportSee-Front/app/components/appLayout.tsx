import {Outlet} from "react-router";
import Header from "./header";

export default function AppLayout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
}