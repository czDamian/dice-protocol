"use client";


export default function VoteConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white">
        <h2 className="text-2xl font-semibold mb-6">Vote Confirmation</h2>

        <Section title="Basic Information">
          <InfoRow label="Proposal" value="Community Fund Allocation" />
          <InfoRow
            label="Description"
            value="Provide a brief description explaining the purpose of the vote"
          />
          <InfoRow
            label="Schedule"
            value="Voting will start by Monday, September 9, 2024, at 10:00 AM WAT and will end Friday, September 13, 2024, at 5:00 PM WAT"
          />
        </Section>

        <Section title="Voting Method">
          <InfoRow label="Method" value="Single-choice" />
          <InfoRow label="Rule" value="None" />
        </Section>

        <Section title="Options Setup">
          <InfoRow
            label="Question"
            value="Can we allocate community fund for hackathon?"
          />
          <InfoRow label="Description" value="None" />
          <div className="mt-2">
            <p className="text-gray-400 mb-1">Options</p>
            <p>Option 1: Yes</p>
            <p>Option 2: No</p>
          </div>
        </Section>

        <Section title="Permissions and Security" />

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:opacity-90 transition duration-300">
            Create Vote
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-blue-400 text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <span className="text-gray-400 w-1/3">{label}</span>
      <span className="w-2/3">{value}</span>
    </div>
  );
}
