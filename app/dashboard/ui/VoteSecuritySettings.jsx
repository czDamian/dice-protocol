"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function VoteSecuritySettings() {
  const [voteMethod, setVoteMethod] = useState("upload");
  const [securitySettings, setSecuritySettings] = useState({
    walletAuthentication: true,
    decentralizedID: false,
    multiSignatureVoting: false,
  });

  const handleSecuritySettingChange = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-xl font-semibold mb-6">
          Set who can vote and security features
        </h2>

        <div className="flex space-x-4 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-500"
              checked={voteMethod === "upload"}
              onChange={() => setVoteMethod("upload")}
            />
            <span className="ml-2 text-white">Upload list</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-500"
              checked={voteMethod === "database"}
              onChange={() => setVoteMethod("database")}
            />
            <span className="ml-2 text-white">Database</span>
          </label>
          <label className="flex items-center opacity-50 cursor-not-allowed">
            <input type="radio" className="form-radio text-blue-500" disabled />
            <span className="ml-2 text-white">Social groups</span>
          </label>
        </div>
        <span className="text-blue-400 text-xs">Coming soon</span>

        <div className="mt-4 bg-white p-8 rounded-lg flex flex-col items-center justify-center">
          <Upload className="text-gray-400 mb-2" size={24} />
          <p className="text-gray-600 text-center text-sm">
            Upload or drag and drop the list of eligible voter wallet address
            here
          </p>
          <p className="text-gray-400 text-center text-xs mt-1">
            (Allowed formats: CSV and XLSX)
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">
            Security settings (optional)
          </h3>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              checked={securitySettings.walletAuthentication}
              onChange={() =>
                handleSecuritySettingChange("walletAuthentication")
              }
            />
            <span className="ml-2 text-white">Wallet authentication</span>
          </label>
          <label className="flex items-center mb-2 opacity-50 cursor-not-allowed">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              disabled
            />
            <span className="ml-2 text-white">Decentralized ID</span>
            <span className="ml-2 text-blue-400 text-xs">Coming soon</span>
          </label>
          <label className="flex items-center opacity-50 cursor-not-allowed">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              disabled
            />
            <span className="ml-2 text-white">Multi-Signature Voting</span>
            <span className="ml-2 text-blue-400 text-xs">Coming soon</span>
          </label>
        </div>

        <div className="flex justify-between mt-8">
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
