import { NavLink } from "react-router-dom";

const InitialNav = () => {
  const linkClasses = ({ isActive }:{isActive:boolean}) =>
    `font-medium px-2 py-1 cursor-pointer transition ${
      isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Ghumgham</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/initialhome/herosection" className={linkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="aboutus" className={linkClasses}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="services" className={linkClasses}>
                Our Services
              </NavLink>
            </li>
            <li>
              <NavLink to="contactus" className={linkClasses}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default InitialNav;