"use client";
import { useState } from "react";

const VotingForm = () => {
  const [formData, setFormData] = useState({
    proposalTitle: "",
    proposalDescription: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            value={formData.proposalTitle}
            onChange={handleChange}
            placeholder="Enter the title of your proposal"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Describe your proposal
          </label>
          <textarea
            name="proposalDescription"
            value={formData.proposalDescription}
            onChange={handleChange}
            placeholder="Tell us about your proposal.."
            rows="4"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Voting schedule
          </label>
          <div className="flex space-x-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
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
