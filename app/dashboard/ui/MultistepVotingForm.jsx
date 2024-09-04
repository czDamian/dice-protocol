"use client";
import { useState } from "react";
import VotingForm from "./VotingForm";
import VotingMethodForm from "./VotingMethodForm";
import VoteSetupProgressBar from "./VoteSetupProgressBar";
import VoteOptionsForm from "./VoteOptionsForm";
import VoteSecuritySettings from "./VoteSecuritySettings";
import VoteConfirmationPage from "./VoteConfirmationPage";
import { useRouter } from "next/navigation";
import { UserPen } from "lucide-react";

const MultistepVotingForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    proposalTitle: "",
    proposalDescription: "",
    startDate: "",
    endDate: "",
    votingMethod: "",
    showRealTimeResults: true,
    users: [], // Initialize users array
  });

  // Handle input changes and update form data
  const handleChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Handle next step navigation after validating the data
  const handleNext = (stepData) => {
    if (validateStepData(stepData)) {
      handleChange(stepData);
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  // Handle previous step navigation
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Validate data for each step (customize this according to the form requirements)
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

  // Final submit to the database after all steps are completed
  const handleFinalSubmit = async () => {
    console.log("Submitting all data:", formData);
    try {
      const response = await fetch(
        `/api/voting-process/66d847fee1cee10ed0a67ae2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        alert("Voting created successfully!");
        router.push("/dashboard");
      } else {
        alert(`Error: ${result.error || "Failed to create voting"}`);
      }
    } catch (error) {
      console.error("Error submitting voting data:", error);
      alert("An error occurred while creating the voting process.");
    }
  };

  return (
    <div className="bg-gray-900">
      <VoteSetupProgressBar currentStep={currentStep} />
      {currentStep === 1 && (
        <VotingForm onNext={handleNext} formData={formData} />
      )}
      {currentStep === 2 && (
        <VotingMethodForm
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
        />
      )}
      {currentStep === 3 && (
        <VoteOptionsForm
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
        />
      )}
      {currentStep === 4 && (
        <VoteSecuritySettings
          onNext={handleNext}
          onPrevious={handlePrevious}
          formData={formData}
          setFormData={setFormData} // Pass setFormData to handle CSV data
        />
      )}
      {currentStep === 5 && (
        <VoteConfirmationPage
          onNext={handleFinalSubmit}
          onPrevious={handlePrevious}
          formData={formData}
        />
      )}
    </div>
  );
};

export default MultistepVotingForm;
