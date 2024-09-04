"use client";
import Button from "@/app/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative block md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <RiMenu3Line size={28} />
      </button>

      <div
        className={`fixed top-0  right-0 h-full w-56 bg-zinc-950 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4">
          <RiCloseLine size={30} />
        </button>
        <div className="flex flex-col gap-6 items-start px-6 h-full  mt-20">
          <Link href="#" className=" hover:text-gray-400">
            Community
          </Link>
          <Link href="#" className=" hover:text-gray-400">
            Analytics
          </Link>
          <Link href="#" className=" hover:text-gray-400">
            Help
          </Link>
          <Link href="#" className=" hover:text-gray-400">
            Notifications
          </Link>
          <Button
            extra={
              "bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold text-black"
            }>
            <span> Create Vote</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
