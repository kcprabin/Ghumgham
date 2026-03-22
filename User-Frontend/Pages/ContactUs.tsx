import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
          className="absolute inset-0 w-full h-full object-cover"
          alt="contact"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In Touch With Us
          </h1>
          <p className="text-lg text-gray-200">
            Have questions about listing your hotel or managing bookings on
            Travallee? Reach out via phone, email, or visit us in Kathmandu.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
          <FaPhoneAlt className="text-3xl text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Phone</h3>
          <p className="text-gray-600">+977 98XXXXXXXX</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
          <FaEnvelope className="text-3xl text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Email</h3>
          <p className="text-gray-600">kcprabin2063@gmail.com</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition text-center">
          <FaMapMarkerAlt className="text-3xl text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Location</h3>
          <p className="text-gray-600">Kathmandu, Nepal</p>
        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to List Your Hotel?
        </h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Join Travallee and start connecting your hotel with travelers using our
          mobile booking platform.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
          Register Your Hotel
        </button>
      </section>

    </div>
  );
};

export default Contact;