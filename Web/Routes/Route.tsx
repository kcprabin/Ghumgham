import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Login from "../Pages/Loginpage"
import InitialHome from "../Pages/InitialHome"

const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<InitialHome/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/register" element={"#"}/>
        </>
    )
)

export default router