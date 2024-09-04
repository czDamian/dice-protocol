"use client";
import { useState, useEffect } from "react";

export const FetchAllVoting = () => {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const organizationId = "66d847fee1cee10ed0a67ae2"; // Your organization ID

  useEffect(() => {
    const loadVotings = async () => {
      try {
        const response = await fetch(`/api/voting-process/${organizationId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setVotings(data.votings || []); // Handle the case where no votings are returned
      } catch (err) {
        console.error("Error fetching votings:", err);
        setError("Failed to load votings.");
      } finally {
        setLoading(false);
      }
    };

    loadVotings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Available Votings</h1>
      {votings.length === 0 ? (
        <p className="text-gray-400">No votings available.</p>
      ) : (
        <ul className="space-y-4">
          {votings.map((voting) => (
            <li
              key={voting._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-white">
                {voting.proposalTitle}
              </h2>
              <p className="text-gray-400">{voting.proposalDescription}</p>
              <p className="text-blue-400">
                Start: {new Date(voting.startTime).toLocaleDateString()} | End:{" "}
                {new Date(voting.endTime).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
