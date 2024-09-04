"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  { number: 1, label: "Basic Information" },
  { number: 2, label: "Voting Method" },
  { number: 3, label: "Options Setup" },
  { number: 4, label: "Permissions & Security" },
  { number: 5, label: "Review & Publish" },
];

export default function VoteSetupProgressBar({ currentStep }) {
  const router = useRouter();
  const handleClose = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full bg-gray-900 p-4">
      <div className="flex justify-end mb-6 mt-2">
        <button
          onClick={handleClose}
          className="ml-4 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 flex items-center">
          Close form
          <X className="ml-2" size={16} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step.number < currentStep
                        ? "bg-blue-500"
                        : step.number === currentStep
                        ? "bg-blue-400"
                        : "bg-gray-700"
                    }`}>
                    {step.number < currentStep ? (
                      <Check className="text-white text-2xl p-2" size={20} />
                    ) : (
                      <span className="text-white text-2xl p-2">
                        {step.number}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-center text-xs mt-1">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      index < currentStep - 1 ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
