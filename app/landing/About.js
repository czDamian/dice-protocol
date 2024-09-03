import { Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
const source = Source_Serif_4({ subsets: ["latin"] });
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
    <div className="my-10 p-4 w-3/4 mx-auto backdrop-blur-sm rounded-xl bg-white/10">
      <div className="bg-[url('/bg-about.png') flex justify-evenly gap-2 items-center mx-auto rounded-xl bg-white/10 p-5 w-full">
        <div className="w-[60ch] flex flex-col gap-3 items-start justify-center font-normal">
          <h2
            className={`${source.className} font-semibold antialiased bg-gradient-to-r from-[#64626C] to-[#EEEBF9] bg-clip-text text-5xl my-3`}
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
      <div className="flex justify-between items-center w-full">
        {feats.map((feat) => (
          <div key={feat.h} className="w-[54ch]">
            <h3>{feat.h}</h3>
            <p>{feat.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
