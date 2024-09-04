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
  options: {
    type: Map,
    of: OptionSchema,
  },
});

const VotingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    voteType: {
      type: String,
      enum: ["single", "multiple"], // Ensures valid vote types
      required: true,
    },
    questions: [QuestionSchema],
    isEligible: {
      users: [String],
      eligibilityCriteria: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    votes: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        questionId: mongoose.Schema.Types.ObjectId,
        optionIds: [String], // Array to support multiple options
      },
    ],
    maxOptionsPerQuestion: {
      type: Number,
      default: 1, // Default to 1 for single choice voting
    },
  },
  { timestamps: true }
);

delete mongoose.models.Voting;

const Voting = mongoose.models.Voting || mongoose.model("Voting", VotingSchema);

export default Voting;
