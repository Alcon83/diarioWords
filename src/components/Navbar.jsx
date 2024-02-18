import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaSpaceShuttle } from 'react-icons/fa';

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4">

      <div>
      <Link href="/" className="text-3xl font-bold">TuDiario.</Link>
      </div>
      <ul className="flex gap-x-4">
        {!session?.user ? (
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
        ) : (
          <>

            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/dashboard"><FaHome className="text-lg" /></Link>
            </li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              <Link href="/api/auth/signout"> <FaSignOutAlt className="text-lg" /></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
