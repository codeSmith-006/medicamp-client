import { Facebook, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/CareCamp logo.png";
import { Send } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes slide-gradient {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
  `;
    document.head.appendChild(style);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-end gap-3 mb-4">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-white mb-2">MediCamp</h2>
          </div>
          <p className="text-sm text-gray-400">
            A platform to connect communities with medical care...
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/camps" className="hover:text-white transition">
                Camps
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition">
                Join Us
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white transition">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@carecamp.com</li>
            <li>Phone: +880-1722-414475</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-3xl mx-auto mt-12 mb-8 text-center">
        <h3 className="text-white text-xl font-semibold mb-2">
          Subscribe to our newsletter
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Get the latest updates and health camp notifications directly in your
          inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center gap-2 px-5 py-2 rounded-full text-white font-semibold 
             bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1] 
             bg-[length:200%_200%] bg-left 
             hover:[animation:slide-gradient_0.2s_ease-in-out_forwards]
             transition-all duration-300 ease-in-out"
          >
            <Send className="w-4 h-4" />
            Subscribe
          </button>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-6 pb-5 text-sm text-center text-gray-500">
        © {year} MediCamp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
