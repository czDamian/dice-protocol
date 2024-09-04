"use client";
import { useState, useEffect } from "react";

const VotingForm = ({ onNext, formData }) => {
  const [localData, setLocalData] = useState({
    proposalTitle: "",
    proposalDescription: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData) {
      setLocalData(formData);
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!localData.proposalTitle) newErrors.proposalTitle = "Title is required";
    if (!localData.proposalDescription)
      newErrors.proposalDescription = "Description is required";
    if (!localData.startDate) newErrors.startDate = "Start date is required";
    if (!localData.endDate) newErrors.endDate = "End date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof onNext === "function") {
        onNext(localData);
      } else {
        console.error("onNext is not a function");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-white text-2xl mb-6 text-center">
          Set up the basics of your vote
        </h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Vote Proposal
          </label>
          <input
            type="text"
            name="proposalTitle"
            value={localData.proposalTitle || ""}
            onChange={handleChange}
            placeholder="Enter the title of your proposal"
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 ${
              errors.proposalTitle
                ? "focus:ring-red-500 border border-red-500"
                : "focus:ring-pink-500"
            }`}
          />
          {errors.proposalTitle && (
            <p className="text-red-500 text-xs mt-1">{errors.proposalTitle}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Describe your proposal
          </label>
          <textarea
            name="proposalDescription"
            value={localData.proposalDescription || ""}
            onChange={handleChange}
            placeholder="Tell us about your proposal.."
            rows="4"
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 ${
              errors.proposalDescription
                ? "focus:ring-red-500 border border-red-500"
                : "focus:ring-pink-500"
            }`}></textarea>
          {errors.proposalDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.proposalDescription}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Voting schedule
          </label>
          <div className="flex space-x-4">
            <input
              type="date"
              name="startDate"
              value={localData.startDate || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                errors.startDate
                  ? "focus:ring-red-500 border border-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
            <input
              type="date"
              name="endDate"
              value={localData.endDate || ""}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 ${
                errors.endDate
                  ? "focus:ring-red-500 border border-red-500"
                  : "focus:ring-pink-500"
              }`}
            />
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md shadow-lg hover:opacity-90 transition-opacity duration-300">
          Next
        </button>
      </form>
    </div>
  );
};

export default VotingForm;
