"use client";
import { useState } from "react";

export default function VoteOptionsForm({ onNext, onPrevious, formData }) {
  const [localData, setLocalData] = useState({
    question: formData.question || "",
    description: formData.description || "",
    options: formData.options || ["", ""],
  });

  const addOption = () => {
    setLocalData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ""],
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...localData.options];
    updatedOptions[index] = value;
    setLocalData({ ...localData, options: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({
      ...localData,
      options: localData.options.filter((opt) => opt.trim() !== ""),
    });
  };

  const handlePreviousStep = () => {
    onPrevious({
      ...localData,
      options: localData.options.filter((opt) => opt.trim() !== ""),
    });
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Define the options for your vote
        </h2>

        <div className="space-y-4">
          <InputField
            label="Add Question"
            type="text"
            value={localData.question}
            onChange={(e) =>
              setLocalData({ ...localData, question: e.target.value })
            }
            placeholder="Enter the vote question"
            required
          />

          <TextareaField
            label="ⓘ Describe your question"
            value={localData.description}
            onChange={(e) =>
              setLocalData({ ...localData, description: e.target.value })
            }
            placeholder="Provide details of the question (optional)"
          />

          <div>
            <h3 className="text-white text-sm font-medium mb-2">
              Add voting options
            </h3>
            {localData.options.map((option, index) => (
              <InputField
                key={index}
                label={`Option ${index + 1}`}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter option ${index + 1} e.g ${
                  index === 0 ? "YES" : "NO"
                }`}
                required
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addOption}
            className="text-blue-400 text-sm hover:underline flex items-center mt-2">
            + More option
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
            Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:opacity-90 transition duration-300">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, type, value, onChange, placeholder, required }) {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
      />
    </div>
  );
}
