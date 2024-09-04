"use client";
import { useState } from "react";

export default function VoteOptionsForm() {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Define the options for your vote
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Add Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the vote question"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              ⓘ Describe your question
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details of the question (optional)"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
          </div>

          <div>
            <h3 className="text-white text-sm font-medium mb-2">
              Add voting option
            </h3>
            {options.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="block text-white text-xs font-medium mb-1">
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Enter option ${index + 1} e.g ${
                    index === 0 ? "YES" : "NO"
                  }`}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            onClick={addOption}
            className="text-blue-400 text-sm hover:underline flex items-center">
            + More option
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
            Previous
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:opacity-90 transition duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
