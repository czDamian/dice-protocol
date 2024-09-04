import React, { useState } from "react";

const OptionsSetupForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    options: ["", ""], // Two initial options
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
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
          Define the options for your vote
        </h2>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Add Question
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter the vote question"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            &#9432; Describe your question
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide details of the question (optional)"
            className="w-full px-4 py-2 h-24 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          />
        </div>

        <h3 className="text-white text-lg mb-4">Add voting option</h3>

        {formData.options.map((option, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-white text-sm font-semibold mb-2">
              Option {index + 1}
            </label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Enter option ${index + 1} e.g YES`}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addOption}
          className="text-blue-400 text-sm mb-6 hover:underline flex items-center">
          + More option
        </button>

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

export default OptionsSetupForm;
