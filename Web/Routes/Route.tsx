import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Login from "../Pages/Loginpage"

const router=createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={"#"}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/register" element={"#"}/>
        </>
    )
)

export default router