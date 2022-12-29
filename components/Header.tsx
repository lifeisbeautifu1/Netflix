import Link from "next/link";
import { useState, useEffect } from "react";
import { SearchIcon, BellIcon } from "@heroicons/react/solid";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New &amp; Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden cursor-pointer h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="cursor-pointer w-6 h-6" />
        {/* <Link href="/account"> */}
        <img
          onClick={logout}
          src="/avatar.png"
          alt="avatar"
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
