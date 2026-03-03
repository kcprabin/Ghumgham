import {useNavigate} from "react-router-dom"

const InitialNav = () => {
    const navigate=useNavigate();
  return (
    <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Ghumgham</div>
            <nav>
              <ul className="flex space-x-6 text-gray-700 font-medium">
                <li className="hover:text-blue-600 cursor-pointer"onClick={()=>{navigate('/')}}>Home</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={()=>navigate('aboutus')}>About Us</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={()=>navigate('services')}>Our Services</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={()=>navigate('contactus')}>Contact Us</li>
              </ul>
            </nav>
          </div>
        </header>
  )
}

export default InitialNav
