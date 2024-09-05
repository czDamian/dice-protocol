// app\api\voting-process\[organization]\route.js
import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Voting from "@/models/VotingProcess";
import Organization from "@/models/Organization";

await connectDb();

// POST route to create a new voting process
export async function POST(request, { params }) {
  const { organization: organizationId } = params;

  const {
    proposalTitle,
    proposalDescription,
    startDate,
    endDate,
    votingMethod,
    voteMethod,
    question,
    description,
    options,
    walletAuthentication,
    decentralizedID,
    multiSignatureVoting,
    anonymousVoting,
    showRealTimeResults,
    users, // Added users field
  } = await request.json();

  const missingFields = [];
  if (!organizationId) missingFields.push("organizationId");
  if (!proposalTitle) missingFields.push("proposalTitle");
  if (!proposalDescription) missingFields.push("proposalDescription");
  if (!startDate) missingFields.push("startDate");
  if (!endDate) missingFields.push("endDate");
  if (!votingMethod) missingFields.push("votingMethod");
  if (!question) missingFields.push("question");
  if (!options || !Array.isArray(options) || options.length < 2) {
    missingFields.push("options (at least two)");
  }

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    if (proposalTitle.length < 10) {
      return NextResponse.json(
        { error: "Proposal title is too short" },
        { status: 400 }
      );
    }

    // Create a new voting mechanism
    const voting = new Voting({
      proposalTitle,
      proposalDescription,
      startTime: new Date(startDate),
      endTime: new Date(endDate),
      voteMethod,
      votingMethod,
      questions: [
        {
          title: question,
          description,
          options: options.map((opt) => ({ text: opt })),
        },
      ],
      securitySettings: {
        walletAuthentication,
        decentralizedID,
        multiSignatureVoting,
        anonymousVoting,
      },
      showRealTimeResults,
      organization: organizationId,
      votes: [],
      isEligible: {
        users: users || [], // Ensure users field is initialized
      },
    });

    await voting.save();

    return NextResponse.json(
      { message: "Voting created successfully", voting },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating voting:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}

// GET route to view all voting processes for a specific organization
export async function GET(request, { params }) {
  const { organization: organizationId } = params;

  try {
    const votings = await Voting.find({
      organization: organizationId,
    }).populate("organization");

    return NextResponse.json({ votings }, { status: 200 });
  } catch (err) {
    console.error("Error fetching voting:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}

// PATCH route to record votes
export async function PATCH(request, { params }) {
  const { organization: organizationId } = params;
  const { votingId, questionId, selectedOptions, userId } =
    await request.json();

  if (!votingId || !questionId || !selectedOptions || !userId) {
    return NextResponse.json(
      { error: "Missing required fields for voting" },
      { status: 400 }
    );
  }

  try {
    const voting = await Voting.findOne({
      _id: votingId,
      organization: organizationId,
    });

    if (!voting) {
      return NextResponse.json({ error: "Voting not found" }, { status: 404 });
    }

    const question = voting.questions.id(questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Validate the maximum options per question based on vote type
    if (voting.votingMethod === "single-choice" && selectedOptions.length > 1) {
      return NextResponse.json(
        { error: "Only one option can be selected for single choice voting" },
        { status: 400 }
      );
    }

    if (
      voting.votingMethod === "multiple-choice" &&
      selectedOptions.length > voting.maxOptionsPerQuestion
    ) {
      return NextResponse.json(
        {
          error: `You can select up to ${voting.maxOptionsPerQuestion} options`,
        },
        { status: 400 }
      );
    }

    // Check if the user has already voted for this question
    const hasVoted = voting.votes.some(
      (vote) =>
        vote.userId.toString() === userId &&
        vote.questionId.toString() === questionId
    );

    if (hasVoted) {
      return NextResponse.json(
        { error: "User has already voted for this question" },
        { status: 400 }
      );
    }

    // Update vote counts for selected options
    selectedOptions.forEach((optionId) => {
      const option = question.options.find(
        (opt) => opt._id.toString() === optionId
      );
      if (option) {
        option.voteCount += 1;
      }
    });

    // Record the user's vote
    voting.votes.push({
      userId,
      questionId,
      optionIds: selectedOptions,
    });

    await voting.save();

    return NextResponse.json(
      { message: "Vote recorded successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error recording vote:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}
