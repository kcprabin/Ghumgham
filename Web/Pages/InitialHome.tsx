const InitialHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-blue-50 to-white font-sans">

      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Ghumgham</div>
          <nav>
            <ul className="flex space-x-6 text-gray-700 font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 cursor-pointer">Our Services</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="grow flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Manage Your Hotel on Ghumgham
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
          Login to access your hotel dashboard, update availability, manage bookings, and get your hotel listed for travelers to discover and book easily.
        </p>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
            Login
          </button>
          <button className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg shadow hover:bg-blue-50 transition cursor-pointer">
            Sign Up
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4">
        &copy; 2026 Ghumgham. All rights reserved.
      </footer>

    </div>
  );
};

export default InitialHome;