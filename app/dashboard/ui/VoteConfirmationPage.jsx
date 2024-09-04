"use client";

export default function VoteConfirmationPage({ onNext, onPrevious, formData }) {
  // Function to handle vote creation and move to the next step
  const handleCreateVote = () => {
    onNext(formData); // Proceed to the next step with form data
    console.log(formData);
  };

  // Function to handle moving to the previous step
  const handlePreviousStep = () => {
    console.log(formData);
    onPrevious(formData); // Go to the previous step with form data
  };

  // Get the first 10 eligible voters or the number of voters if fewer than 10
  const eligibleVoters = formData.users ? formData.users.slice(0, 10) : [];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white">
        <h2 className="text-2xl font-semibold mb-6">Vote Confirmation</h2>

        {/* Basic Information Section */}
        <Section title="Basic Information">
          <InfoRow
            label="Proposal"
            value={formData.proposalTitle || "Not Set"}
          />
          <InfoRow
            label="Description"
            value={
              formData.proposalDescription ||
              "Provide a brief description explaining the purpose of the vote"
            }
          />
          <InfoRow label="Start Date" value={formData.startDate || "not set"} />
          <InfoRow label="End Date" value={formData.endDate || "not set"} />
        </Section>

        {/* Voting Method Section */}
        <Section title="Voting Method">
          <InfoRow
            label="Method"
            value={formData.votingMethod || "not chosen"}
          />
          <InfoRow
            label="Show Real-Time Results"
            value={formData.showRealTimeResults ? "Enabled" : "Disabled"}
          />
        </Section>

        {/* Options Setup Section */}
        <Section title="Options Setup">
          <InfoRow
            label="Question"
            value={formData.question || "No question set"}
          />
          <InfoRow
            label="Question Description"
            value={formData.optionDescription || "None"}
          />

          <div className="mt-2">
            <p className="text-gray-400 mb-1">Options</p>
            {formData.options && formData.options.length > 0 ? (
              formData.options.map((option, index) => (
                <p key={index}>{`Option ${index + 1}: ${option}`}</p>
              ))
            ) : (
              <>
                <p>Option 1: -</p>
                <p>Option 2: -</p>
              </>
            )}
          </div>
        </Section>

        {/* Permissions and Security Section */}
        <Section title="Permissions and Security">
          <InfoRow
            label="Wallet Authentication"
            value={formData.walletAuthentication ? "Enabled" : "Disabled"}
          />
          <InfoRow
            label="Decentralized ID"
            value={formData.decentralizedID ? "Enabled" : "Disabled"}
          />
          <InfoRow
            label="Multi-Signature Voting"
            value={formData.multiSignatureVoting ? "Enabled" : "Disabled"}
          />

          {/* Eligible Voters Section */}
          <Section title="Eligible Voters">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b"></th>
                    <th className="py-2 px-4 border-b">Voter Address</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibleVoters.length > 0 ? (
                    eligibleVoters.map((voter, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{voter}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="py-2 px-4 border-b text-center">
                        No eligible voters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Section>
        </Section>

        {/* Create Vote and Previous Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={handlePreviousStep}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
            Previous
          </button>
          <button
            onClick={handleCreateVote}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:opacity-90 transition duration-300">
            Create Vote
          </button>
        </div>
      </div>
    </div>
  );
}

// Section Component to structure different sections of the confirmation page
function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-blue-400 text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// InfoRow Component for displaying label-value pairs in the sections
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <span className="text-gray-400 w-1/3">{label}</span>
      <span className="w-2/3">{value}</span>
    </div>
  );
}
