const VotingActive = () => {
  return (
    <div>
      {/* voting listing for either of ongoing, etc */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm my-6 place-content-center">
        <div className="bg-green-300 rounded-lg p-4 text-black max-w-80">
          <div className="flex items-center gap-4 pb-2">
            <Image
              src="/logo.png"
              alt="logo"
              height={1000}
              width={1000}
              className="w-8"
            />
            <div className="font-bold">Deeprel DAO</div>
          </div>
          <h1 className="font-bold my-2 text-base">
            Community Fund Allocation
          </h1>
          <p>
            Decide how to allocate this quarter's budget among various community
            projects.
          </p>
          <div className="flex w-full font-bold items-center justify-between pt-4">
            <button className="border w-full py-3 rounded-full bg-slate-100">
              vote now
            </button>
            <button className="px-4 py-2 w-full text-xs">
              Ends in 2 days, 3 hours
            </button>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-white max-w-80">
          <div className="flex items-center gap-4 pb-2">
            <Image
              src="/logo.png"
              alt="logo"
              height={1000}
              width={1000}
              className="w-8"
            />
            <div className="font-bold">Deeprel DAO</div>
          </div>
          <h1 className="font-bold my-2 text-base">
            Community Fund Allocation
          </h1>
          <p>
            Decide how to allocate this quarter's budget among various community
            projects.
          </p>
          <div className="flex w-full font-bold items-center justify-between pt-4">
            <button className="border px-6 py-3 rounded-full">
              view details
            </button>
            <button className="px-4 py-2 text-xs hidden">
              Ends in 2 days, 3 hours
            </button>
          </div>
        </div>
        <div className="bg-green-300 rounded-lg p-4 text-black max-w-80">
          <div className="flex items-center gap-4 pb-2">
            <Image
              src="/logo.png"
              alt="logo"
              height={1000}
              width={1000}
              className="w-8"
            />
            <div className="font-bold">Deeprel DAO</div>
          </div>
          <h1 className="font-bold my-2 text-base">
            Community Fund Allocation
          </h1>
          <p>
            Decide how to allocate this quarter's budget among various community
            projects.
          </p>
          <div className="flex w-full font-bold items-center justify-between pt-4">
            <button className="border w-full py-3 rounded-full bg-slate-100">
              vote now
            </button>
            <button className="px-4 py-2 w-full text-xs">
              Ends in 2 days, 3 hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VotingActive;
