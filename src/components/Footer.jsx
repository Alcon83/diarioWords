import React from 'react';
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaSpaceShuttle } from 'react-icons/fa';

function Footer() {

  return (
    <footer className="bg-gray-800 text-white px-6 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="text-3xl font-bold">TuDiario.</Link>
        </div>

        <ul className="flex gap-x-4 mb-6 md:mb-0">

          <>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/"><FaHome className="text-lg" /></Link>
            </li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/auth/login"><FaSignInAlt className="text-lg" /></Link>
            </li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/auth/register"><FaUserPlus className="text-lg" /></Link>
            </li>
          </>

          <>

            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/dashboard"><FaHome className="text-lg" /></Link>
            </li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/api/auth/signout"> <FaSignOutAlt className="text-lg" /></Link>
            </li>
          </>

        </ul>

        <div className="flex gap-x-4">
          <a href="https://facebook.com" className="hover:text-blue-600 transition-colors duration-300"><FaFacebook className="text-xl" /></a>
          <a href="https://twitter.com" className="hover:text-blue-300 transition-colors duration-300"><FaTwitter className="text-xl" /></a>
          <a href="https://instagram.com" className="hover:text-pink-400 transition-colors duration-300"><FaInstagram className="text-xl" /></a>
          <a href="https://linkedin.com" className="hover:text-blue-500 transition-colors duration-300"><FaLinkedin className="text-xl" /></a>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>© {new Date().getFullYear()} TuDiario. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
