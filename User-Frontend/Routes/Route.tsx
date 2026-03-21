import {createBrowserRouter, createRoutesFromElements, Route, Navigate} from "react-router-dom"
import Login from "../Pages/Loginpage"
import InitialHome from "../Pages/InitialHome"
import AboutUs from "../Pages/AboutUs"
import Services from "../Pages/Services"
import ContactUs from "../Pages/ContactUs"
import Herosection from "../Components/Herosection"

const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/login"element={<Login/>}/>
        <Route path="/register" element={"#"}/>

        <Route path="/" element={<Navigate to="/initialhome/herosection" replace/>}/>
        <Route path="/initialhome"element={<InitialHome/>}>
        <Route path="herosection" element={<Herosection/>}/>
        <Route path="aboutus" element={<AboutUs/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="contactus" element={<ContactUs/>}/>
        </Route>

        </>
    )
)

export default router