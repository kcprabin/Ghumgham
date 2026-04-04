import { FaHotel, FaMobileAlt, FaChartLine, FaCalendarCheck, FaImage, FaUsers } from "react-icons/fa"

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          className="absolute inset-0 w-full h-full object-cover"
          alt="hotel"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Services For Hotel Partners
          </h1>

          <p className="text-lg text-gray-200 max-w-2xl">
            Everything you need to manage your hotel online, reach travelers,
            and handle bookings efficiently through the Travallee platform.
          </p>
        </div>

      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Service Card */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaHotel className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hotel Listing</h3>
            <p className="text-gray-600">
              Register your hotel and showcase rooms, facilities, amenities,
              and services to travelers searching for accommodation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaMobileAlt className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mobile App Exposure</h3>
            <p className="text-gray-600">
              Your property becomes visible to users browsing and booking hotels
              through the Travallee mobile application.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaCalendarCheck className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Booking Management</h3>
            <p className="text-gray-600">
              Receive reservations instantly and manage check-ins, bookings,
              and guest information from a single dashboard.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaChartLine className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
            <p className="text-gray-600">
              Increase hotel occupancy and reach more travelers actively
              searching for accommodation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaImage className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Property Showcase</h3>
            <p className="text-gray-600">
              Upload images, room details, pricing, and amenities to attract
              potential guests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Reach</h3>
            <p className="text-gray-600">
              Connect with thousands of travelers looking for hotels through
              our booking ecosystem.
            </p>
          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Start Listing Your Hotel Today
        </h2>

        <p className="mb-6 text-lg max-w-xl mx-auto">
          Join Travallee and start receiving bookings from travelers using our
          mobile hotel booking application.
        </p>

        <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition cursor-pointer">
          Register Your Hotel
        </button>

      </section>

    </div>
  )
}

export default Services