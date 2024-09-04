import VotingForm from "../ui/VotingForm";
import VoteSetupProgressBar from "../ui/VoteSetupProgressBar";

const NewVote = () => {
  return (
    <div className="my-4">
      <VoteSetupProgressBar />
      <VotingForm />
    </div>
  );
};
export default NewVote;
