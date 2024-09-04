"use client";
import { useState } from "react";
import VotingForm from "./VotingForm";
import VotingMethodForm from "./VotingMethodForm";
import VoteSetupProgressBar from "./VoteSetupProgressBar";

const MultistepVotingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    proposalTitle: "",
    proposalDescription: "",
    startDate: "",
    endDate: "",
    votingMethod: "",
    anonymousVoting: true,
    showRealTimeResults: true,
  });

  const handleChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = (stepData) => {
    if (validateStepData(stepData)) {
      handleChange(stepData);
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const validateStepData = (stepData) => {
    if (currentStep === 1) {
      return (
        stepData.proposalTitle &&
        stepData.proposalDescription &&
        stepData.startDate &&
        stepData.endDate
      );
    }
    if (currentStep === 2) {
      return stepData.votingMethod;
    }
    return true;
  };

  const handleFinalSubmit = () => {
    console.log("Submitting all data:", formData);
    // Send the data to the database or API here
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <VoteSetupProgressBar currentStep={currentStep} />
      {currentStep === 1 && (
        <VotingForm 
          onNext={handleNext} 
          formData={formData} 
        />
      )}
      {currentStep === 2 && (
        <VotingMethodForm
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
        />
      )}
      {currentStep === 5 && (
        <div className="flex items-center justify-center">
          <button
            onClick={handleFinalSubmit}
            className="py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md shadow-lg hover:opacity-90 transition-opacity duration-300">
            Submit All Data
          </button>
        </div>
      )}
    </div>
  );
};

export default MultistepVotingForm;
