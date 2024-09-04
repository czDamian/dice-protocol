"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import Papa from "papaparse";

export default function VoteSecuritySettings({ onNext, onPrevious, formData }) {
  const [voteMethod, setVoteMethod] = useState(formData.voteMethod || "upload");
  const [securitySettings, setSecuritySettings] = useState({
    walletAuthentication: formData.walletAuthentication ?? true,
    decentralizedID: formData.decentralizedID ?? false,
    multiSignatureVoting: formData.multiSignatureVoting ?? false,
  });
  const [fileError, setFileError] = useState("");
  const [csvData, setCsvData] = useState([]);

  const handleSecuritySettingChange = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ voteMethod, ...securitySettings, users: csvData });
  };

  const handlePreviousStep = () => {
    onPrevious({ voteMethod, ...securitySettings });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setFileError("Please upload a valid CSV file.");
      setCsvData([]);
      return;
    }

    if (file.size > 102400) {
      setFileError("The file must be under 100kb.");
      setCsvData([]);
      return;
    }

    setFileError("");

    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data;
        // Remove empty rows
        const filteredRows = rows.filter((row) => row.length > 0);
        // Limit to 5 rows and 5 columns
        const limitedRows = filteredRows
          .slice(0, 5)
          .map((row) => row.slice(0, 5));
        setCsvData(limitedRows);
      },
      header: false,
    });
  };

  return (
    <div className="min bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
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

        {voteMethod === "upload" && (
          <div className="mt-4 bg-slate-900 p-8 rounded-lg flex flex-col items-center justify-center">
            <Upload className="text-gray-400 mb-2" size={24} />
            <p className="text-gray-600 text-center text-sm">
              Upload or drag and drop the list of eligible voter wallet
              addresses here
            </p>
            <p className="text-gray-400 text-center text-xs mt-1">
              (Allowed format: CSV under 100kb)
            </p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mt-2"
            />
            {fileError && (
              <p className="text-red-500 text-xs mt-2">{fileError}</p>
            )}
            {csvData.length > 0 && (
              <div className="overflow-x-auto mt-4">
                <table className=" divide-y text-xs divide-gray-700">
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {csvData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`px-4 py-2 text-white ${
                              rowIndex === 0 ? "font-bold" : ""
                            }`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

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
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
            Previous
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:opacity-90 transition duration-300">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
