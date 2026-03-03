import { Outlet } from "react-router-dom";
import InitialNav from "../Components/InitialNav";
import Footer from "../Components/Footer";

const InitialHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">

      {/* Navbar */}
         <InitialNav/>    

      {/* Hero Section */}
      <Outlet/>

      {/* Footer */}
     <Footer/>

    </div>
  );
};

export default InitialHome;