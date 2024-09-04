"use client";
import { useState } from "react";
import Image from "next/image";

const VotingActive = ({ onVote, formData }) => {
  const [activeVotes, setActiveVotes] = useState([
    {
      id: 1,
      title: "Community Fund Allocation",
      description:
        "Decide how to allocate this quarter's budget among various community projects.",
      timeRemaining: "Ends in 2 days, 3 hours",
    },
    {
      id: 2,
      title: "Community Fund Allocation",
      description:
        "Decide how to allocate this quarter's budget among various community projects.",
      timeRemaining: "Ends in 2 days, 3 hours",
    },
    {
      id: 3,
      title: "Community Fund Allocation",
      description:
        "Decide how to allocate this quarter's budget among various community projects.",
      timeRemaining: "Ends in 2 days, 3 hours",
    },
  ]);

  const handleVote = (id) => {
    // Add handling logic here, e.g., navigate to a detailed view or mark as voted
    onVote(id);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Voting listing for ongoing votes */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm my-6 place-content-center">
        {activeVotes.map((vote) => (
          <div
            key={vote.id}
            className="bg-green-300 rounded-lg p-4 text-black max-w-80">
            <div className="flex items-center gap-4 pb-2">
              <Image
                src="/logo.png"
                alt="logo"
                height={1000}
                width={1000}
                className="w-8"
              />
              <div className="font-bold">Deeprel DAO</div>
            </div>
            <h1 className="font-bold my-2 text-base">{vote.title}</h1>
            <p>{vote.description}</p>
            <div className="flex w-full font-bold items-center justify-between pt-4">
              <button
                onClick={() => handleVote(vote.id)}
                className="border w-full py-3 rounded-full bg-slate-100">
                Vote Now
              </button>
              <button className="px-4 py-2 w-full text-xs">
                {vote.timeRemaining}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingActive;
