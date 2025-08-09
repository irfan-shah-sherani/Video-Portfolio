import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Menu(){
    return(
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}