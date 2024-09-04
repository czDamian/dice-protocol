import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    text: String,
    voteCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  options: [OptionSchema],
});

const VotingSchema = new mongoose.Schema(
  {
    // Proposal Details
    proposalTitle: { type: String, required: true },
    proposalDescription: { type: String },

    // Voting Timeframe
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    // Voting Method and Type
    voteMethod: {
      type: String,
      enum: ["upload", "database"],
      default: "upload",
    },
    votingMethod: {
      type: String,
      enum: ["single-choice", "multiple-choice"],
      required: true,
    },

    // Question and Options
    questions: [
      {
        title: { type: String, required: true },
        description: { type: String },
        options: [
          {
            text: { type: String, required: true },
            voteCount: { type: Number, default: 0 },
          },
        ],
      },
    ],

    // Security and Privacy Settings
    securitySettings: {
      walletAuthentication: { type: Boolean, default: true },
      decentralizedID: { type: Boolean, default: false },
      multiSignatureVoting: { type: Boolean, default: false },
    },

    // Voting Options
    showRealTimeResults: { type: Boolean, default: false },

    // Eligible Users
    isEligible: {
      users: [], // Initialized as an empty array of objects
      eligibilityCriteria: { type: String },
    },

    // Organization Reference
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },

    // Recorded Votes
    votes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        questionId: { type: mongoose.Schema.Types.ObjectId },
        optionIds: [String], // Array to support multiple selected options
      },
    ],

    // Metadata
    maxOptionsPerQuestion: {
      type: Number,
      default: 1, // Default to single-choice
    },
  },
  { timestamps: true }
);

// Ensure the model is not redefined
delete mongoose.models.Voting;

const Voting = mongoose.models.Voting || mongoose.model("Voting", VotingSchema);

export default Voting;
