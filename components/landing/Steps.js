import Image from "next/image";
import React from "react";
import { source } from "../../app/fonts/fonts";
import clsx from "clsx";

const steps = [
  {
    pic: "/step1.png",
    h: "Create Your Account",
    p: "Sign up using your preferred blockchain wallet",
  },
  {
    pic: "/step2.png",
    h: "Create or Join a Community",
    p: "Participate in existing governance or set up your own group",
  },
  {
    pic: "/step3.png",
    h: "Start Voting",
    p: "Use your tokens to vote on proposals and help shape the future of your community",
  },
];
export default function Steps() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-12 py-20 bg-[#171521]">
      <div className="my-6 md:my-9 text-center flex flex-col gap-3">
        <h2
          className={`${source.className} antialiased text-5xl font-semibold bg-gradient-to-r from-[#64626C] to-[#EEEBF9] bg-clip-text text-transparent`}
        >
          How to Vote on Dice Protocol
        </h2>
        <p className="w-[34ch] md:w-[45ch] mx-auto my-3">
          Getting started is simple. Follow these steps to join the platform and
          begin making an impact in your community today
        </p>
      </div>
      <div className="flex flex-col md:flex-row  flex-wrap md:justify-start justify-evenly items-center md:mx-auto gap-7 my-7 md:my-9">
        {steps.map((step) => (
          <div
            key={step.h}
            className={clsx(
              "flex flex-col flex-wrap justify-center items-start px-3 pt-3 pb-[5%] gap-3 border-2 border-white/20 rounded-2xl",
              step.h.includes("Join") && "md:ml-[50%] lg:ml-auto"
            )}
          >
            <Image
              src={step.pic}
              alt="step pic"
              className={clsx("rounded-lg")}
              width={360}
              height={120}
            />
            <h3 className="text-[1.3rem]">{step.h}</h3>
            <p className="w-[34ch]">{step.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
