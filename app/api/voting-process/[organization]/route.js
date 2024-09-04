import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Voting from "@/models/VotingProcess";
import Organization from "@/models/Organization";

await connectDb();

// POST route to create a new voting process
export async function POST(request, { params }) {
  const { organization: organizationId } = params;

  const {
    title,
    description,
    startTime,
    endTime,
    voteType,
    questions,
    isEligible,
    maxOptionsPerQuestion, // Include this in the request
  } = await request.json();

  const missingFields = [];
  if (!organizationId) missingFields.push("organizationId");
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!startTime) missingFields.push("startTime");
  if (!endTime) missingFields.push("endTime");
  if (!voteType) missingFields.push("voteType");
  if (!questions) missingFields.push("questions");
  if (!isEligible) missingFields.push("isEligible");

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    if (title.length < 10) {
      return NextResponse.json(
        { error: "Title is too short" },
        { status: 400 }
      );
    }

    // Ensure `questions` is properly formatted
    if (
      !Array.isArray(questions) ||
      questions.some(
        (q) =>
          !q.title ||
          !q.description ||
          !q.options ||
          typeof q.options !== "object"
      )
    ) {
      return NextResponse.json(
        { error: "Invalid questions format" },
        { status: 400 }
      );
    }

    // Create a new voting mechanism
    const voting = new Voting({
      title,
      description,
      startTime,
      endTime,
      voteType,
      questions,
      isEligible,
      organization: organizationId,
      votes: [],
      maxOptionsPerQuestion: maxOptionsPerQuestion || 1, // Default to 1 if not provided
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
    if (voting.voteType === "single" && selectedOptions.length > 1) {
      return NextResponse.json(
        { error: "Only one option can be selected for single choice voting" },
        { status: 400 }
      );
    }

    if (
      voting.voteType === "multiple" &&
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
      if (question.options.has(optionId)) {
        const option = question.options.get(optionId);
        option.voteCount += 1;
        question.options.set(optionId, option);
      }
    });

    // Record the user's vote
    voting.votes.push({
      userId,
      questionId,
      optionIds: selectedOptions, // Store all selected options
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


// [
//   {
//     votingId: "MULTI_VOTING_ID", // Replace with the actual voting ID for the multiple-choice voting process
//     questionId: "MULTI_QUESTION_ID", // Replace with the actual question ID for the multiple-choice question
//     selectedOptions: ["vscode", "intellij"], // IDs of the options you are voting for
//     userId: "USER_ID_1", // Replace with the actual user ID
//   },
//   {
//     votingId: "SINGLE_VOTING_ID", // Replace with the actual voting ID for the single-choice voting process
//     questionId: "SINGLE_QUESTION_ID", // Replace with the actual question ID for the single-choice question
//     selectedOptions: ["csharp"], // ID of the last option you are voting for in the single-choice
//     userId: "USER_ID_2", // Replace with the actual user ID
//   },
// ];
