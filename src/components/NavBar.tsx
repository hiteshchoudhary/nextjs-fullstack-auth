"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`transition-all duration-300 ease-in-out ${
        scrolling ? "transform -translate-y-16" : ""
      } fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md bg-gray-900 p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              1cliQ
            </span>
        
        </Link>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Expert?
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

