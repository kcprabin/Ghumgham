import { Typewriter } from "react-simple-typewriter"
const Herosection = () => {
  return (
 <main className="grow flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          <Typewriter
            words={[
              "Manage Your Hotel on Ghumgham",
              "Update Availability Instantly",
              "Handle Bookings with Ease",
              "Grow Your Hotel Business"
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
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
  )
}

export default Herosection
