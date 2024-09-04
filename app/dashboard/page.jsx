import VoteConfirmationPage from "./ui/VoteConfirmationPage";
import VoteOptionsForm from "./ui/VoteOptionsForm";
import VoteSecuritySettings from "./ui/VoteSecuritySettings";
import VoteSetupProgressBar from "./ui/VoteSetupProgressBar";
import VotingActive from "./ui/VotingActive";
import VotingForm from "./ui/VotingForm";
import VotingList from "./ui/VotingList";
import VotingMethodForm from "./ui/VotingMethodForm";


const Dashboard = () => {
  return (
    <div>
      <VotingList />
      <VoteSetupProgressBar />
      <VotingForm />
      <VotingMethodForm />
      <VotingActive />
      <VoteOptionsForm />
      <VoteSecuritySettings />
      <VoteConfirmationPage />
    </div>
  );
};
export default Dashboard;
