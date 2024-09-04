<<<<<<< HEAD:components/landing/About.js
import { source } from "../../app/fonts/fonts";
import Image from "next/image";
import React from "react";
import Button from "../../app/ui/Button";
=======
import { source } from "../fonts/fonts";
import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
>>>>>>> bddc4df5a6c85e6cd85a87961f6c147b0b41dcf6:app/landing/About.js

const feats = [
  {
    h: "Decentralized Deision-Making",
    p: "No central authority, the community governs itself",
  },
  {
    h: "Transparent and Secure",
    p: "Built on blockchain to ensure transparency and security",
  },
  {
    h: "Multi-Voting System",
    p: "Vote based on your preferences with a system that balances influence across all members",
  },
];
export default function About() {
  return (
    <div className="my-10 p-4 w-11/12 lg:w-3/4 mx-auto backdrop-blur-sm rounded-2xl bg-[#171521] md:p-[3%]">
      <div
        className="flex flex-col-reverse lg:flex-row justify-evenly gap-2 items-center mx-auto rounded-3xl p-12 lg:p-5 w-full bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/bg-about.png')" }}
      >
        <div className="lg:w-[60ch] flex flex-col text-center lg:text-left gap-3 items-start justify-center font-normal">
          <h2
            className={`${source.className} bg-clip-text font-semibold antialiased bg-gradient-to-r from-[#45444a] to-[#EEEBF9] text-5xl my-3 leading-tight text-transparent`}
          >
            What is Our Governance Platform?
          </h2>
          <p>
            Our platform <span className="font-bold">“Dice protocol”</span>{" "}
            offers a transparent and inclusive approach to community governance.
            By leveraging cutting-edge technology, we provide a system where all
            members can participate in shaping decisions and driving progress.
          </p>
          <Button
            extra={
              "my-3 bg-transparent border-2 border-white hover:bg-stone-700 md:w-1/3 w-1/2 mx-auto lg:mx-0"
            }
          >
            Learn More
          </Button>
        </div>
        <Image src="/about.png" alt="about image" width={400} height={400} />
      </div>
      <div className="flex flex-col md:flex-row md:text-left text-center justify-evenly items-center w-full text-sm mx-auto my-10 md:gap-4 gap-8 md:px-12 px-2 md:divide-y-0 md:py-3">
        {feats.map((feat) => (
          <div
            key={feat.h}
            className={`w-[37ch] md:w-[26ch] lg:w-[37ch] flex flex-col gap-2 grow`}
          >
            <h3 className={`text-[#56A4D0] ${source.className}`}>{feat.h}</h3>
            <p className="text-stone-300">{feat.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
