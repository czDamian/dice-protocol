"use client";
import { useState } from "react";

const VotingMethodForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    votingMethod: "",
    anonymousVoting: true,
    showRealTimeResults: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or navigate to the next step
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-white text-2xl mb-6 text-center">
          Choose how votes will be cast
        </h2>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Select Voting Method
          </label>
          <select
            name="votingMethod"
            value={formData.votingMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option value="" disabled>
              Choose the voting method
            </option>
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="token-based">Token-Based</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Additional settings
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                name="anonymousVoting"
                checked={formData.anonymousVoting}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-pink-500 bg-gray-700 border-none rounded focus:ring-0"
              />
              <span className="ml-2">Anonymous voting</span>
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                name="showRealTimeResults"
                checked={formData.showRealTimeResults}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-pink-500 bg-gray-700 border-none rounded focus:ring-0"
              />
              <span className="ml-2">Show real-time vote result</span>
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-3 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition duration-300">
            Previous
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md shadow-lg hover:opacity-90 transition-opacity duration-300">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default VotingMethodForm;
