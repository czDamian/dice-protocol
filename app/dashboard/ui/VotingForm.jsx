"use client";
import { useState } from "react";

const VotingForm = ({ onNext, formData }) => {
  const [localData, setLocalData] = useState(formData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    const { proposalTitle, proposalDescription, startDate, endDate } =
      localData;

    if (!proposalTitle || proposalTitle.length <= 10) {
      newErrors.proposalTitle =
        "Proposal title must be greater than 10 characters.";
    }
    if (!proposalDescription || proposalDescription.length <= 30) {
      newErrors.proposalDescription =
        "Proposal description must be greater than 30 characters.";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!endDate) {
      newErrors.endDate = "End date is required.";
    }
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = "End date must be greater than the start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(localData);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center text-base mx-2">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-white text-2xl mb-6 text-center capitalize">
          setup a proposal
        </h2>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Vote Proposal
          </label>
          <input
            type="text"
            name="proposalTitle"
            value={localData.proposalTitle}
            onChange={handleChange}
            placeholder="Title of your proposal"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          {errors.proposalTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.proposalTitle}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Describe your proposal
          </label>
          <textarea
            name="proposalDescription"
            value={localData.proposalDescription}
            onChange={handleChange}
            placeholder="Tell us about your proposal.."
            rows="4"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            required></textarea>
          {errors.proposalDescription && (
            <p className="text-red-500 text-sm mt-1">
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
              value={localData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
            <input
              type="date"
              name="endDate"
              value={localData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="px-8 float-right py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:opacity-90 transition duration-300 mt-4">
          Next
        </button>
      </form>
    </div>
  );
};

export default VotingForm;
