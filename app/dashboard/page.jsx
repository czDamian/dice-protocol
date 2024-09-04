import VotingForm from "./ui/VotingForm";
import VotingList from "./ui/VotingList";
import VotingMethodForm from "./ui/VotingMethodForm";


const Dashboard = () => {
  return <div>
    <VotingList/>
    <VotingForm/>
    <VotingMethodForm/>
  </div>;
};
export default Dashboard;
