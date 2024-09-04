import Search from "./Search";

const VotingNavigation = () => {
  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex justify-start gap-4">
        <div className="border border-gray-500 rounded px-2 py-1 hover:border-gray-100 cursor-pointer bg-white text-black">
          All
        </div>
        <div className="border border-gray-500 rounded px-2 py-1 hover:border-gray-100 cursor-pointer text-gray-400">
          Ongoing
        </div>
        <div className="border border-gray-500 rounded px-2 py-1 hover:border-gray-100 cursor-pointer text-gray-400">
          Upcoming
        </div>
        <div className="border border-gray-500 rounded px-2 py-1 hover:border-gray-100 cursor-pointer text-gray-400">
          Closed
        </div>
      </div>
      <Search />
    </div>
  );
};

export default VotingNavigation;
