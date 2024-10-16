import { NavLink } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Logo Section (Optional) */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-white">ClassNet</h1>
                    <p className="text-sm">Expanding Learning Horizons.</p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap gap-5 mb-4 md:mb-0">
                    <NavLink
                        to="/"
                        className="link link-hover text-gray-400 hover:text-white transition duration-200"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/aboutUs"
                        className="link link-hover text-gray-400 hover:text-white transition duration-200"
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/forum"
                        className="link link-hover text-gray-400 hover:text-white transition duration-200"
                    >
                        Forum
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="link link-hover text-gray-400 hover:text-white transition duration-200"
                    >
                        Contact
                    </NavLink>
                </nav>

                {/* Social Media Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a
                        href="https://twitter.com"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        <FaTwitter className="h-6 w-6 fill-current" />
                    </a>
                    <a
                        href="https://facebook.com"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        <FaFacebook className="h-6 w-6 fill-current" />
                    </a>
                    <a
                        href="https://youtube.com"
                        aria-label="YouTube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 transition-colors duration-200"
                    >
                        <FaYoutube className="h-6 w-6 fill-current" />
                    </a>
                    <a
                        href="https://instagram.com"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600 transition-colors duration-200"
                    >
                        <FaInstagram className="h-6 w-6 fill-current" />
                    </a>
                </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-6 text-center border-t border-gray-700 pt-4">
                <p className="text-sm">
                    © {new Date().getFullYear()} ClassNet. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
