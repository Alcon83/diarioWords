import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const customStyles = {
  maxWidth: "1200px",

};


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, className = "" }) {
  return (
    <html lang="en">
      <body className={`items-center justify-around w-full h-full z-0   text-dark dark:text-light bg-slate-900  lg:px-1 md:rounded-none  mx-auto ${className}`} style={customStyles}>
        <Navbar />
        <div className="bg-slate-600">

          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
