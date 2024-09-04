"use client";
import Image from "next/image";
import Button from "../../app/ui/Button";
import Link from "next/link";
import Nav from "./Nav";
import { source } from "../../app/fonts/fonts";
import { FaRegStar } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import MobileNavbar from "@/app/dashboard/ui/MobileNavbar";

export default function Hero() {
  return (
    <div
      className="bg-no-repeat bg-cover w-screen"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <Nav />
      <Link href="./" className="absolute left-[6%] top-[5%] md:block hidden">
        <Image src="/logo.png" alt="Logo" width={24} height={24} />
      </Link>
      <span>
        <span className="fixed z-20 top-[5%] right-[5%]">
          <MobileNavbar
            links={["About", "Roadmap", "FAQ"]}
            btn={"Connect Wallet"}
          />
        </span>
        <span className="md:hidden block fixed z-10 top-[2%] w-full backdrop-blur-sm bg-white">
          <Link href="./" className="absolute left-[6%] mt-5">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
          </Link>
        </span>
      </span>
      <div className=" lg:p-20 md:pt-[15%] pt-[25%] mx-auto flex flex-col lg:flex-row justify-evenly items-center text-stone-300 overflow-hidden">
        <div className="flex flex-col lg:items-start items-center text-center lg:text-left justify-between w-[40ch] md:w-[60ch] text-base">
          <p className="mb-5 text-sm flex flex-row items-center">
            <FaRegStar className="mr-1" /> The most reliable voting dApp
          </p>
          <h1
            className={` ${source.className} antialiased md:text-6xl text-5xl md:w-[20ch] font-semibold my-8 bg-gradient-to-r from-[#64626C] to-[#EEEBF9] bg-clip-text text-transparent`}
          >
            Decentralized Voting for Fair Community Governance
          </h1>
          <p className="md:my-2">
            Harness the power of decentralized voting to create a more inclusive
            and balanced community experience
          </p>
          <Button
            extra={
              "my-3 bg-transparent border-2 border-white hover:bg-stone-700 md:w-1/3 w-1/2 mx-auto lg:mx-0"
            }
          >
            Get Started
          </Button>
        </div>
        <Image
          src="/hero.png"
          alt="hero image"
          width={665}
          height={694}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
