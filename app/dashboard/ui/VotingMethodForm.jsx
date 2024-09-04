"use client";
import { useState } from "react";

const VotingMethodForm = ({ onNext, onPrevious, formData }) => {
  const [localData, setLocalData] = useState(formData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData({
      ...localData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localData.votingMethod) {
      newErrors.votingMethod = "Please select a voting method.";
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
    <div className="bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 mx-2 p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="capitalize font-bold text-2xl mb-6 text-center">
          Choose Voting Method
        </h2>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">
            Select Voting Method
          </label>
          <select
            name="votingMethod"
            value={localData.votingMethod || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option value="" disabled>
              Choose the voting method
            </option>
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
          </select>
          {errors.votingMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.votingMethod}</p>
          )}
          <p className="text-gray-400 text-sm mt-2 px-2">
            Single choice allows the users to vote only once, while multiple
            choice allows the users to vote up to a maximum of 3 times.
          </p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold my-4 text-white">
            Additional settings
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="showRealTimeResults"
              checked={localData.showRealTimeResults}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 bg-gray-700 border-none ml-4 rounded focus:ring-0"
            />
            <span className="pl-2 text-white">Show real-time results</span>
          </label>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-md shadow-lg hover:opacity-90 transition-opacity duration-300">
            Previous
          </button>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-lg hover:opacity-90 transition-opacity duration-300">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default VotingMethodForm;
