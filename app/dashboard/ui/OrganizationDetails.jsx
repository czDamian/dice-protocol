"use client";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/Button";

const OrganizationDetails = ({ organization, setShowModal }) => {
  const router = useRouter();

  const handleCreateVoting = () => {
    console.log("clicked");
    router.push("/dashboard/new-voting");
  };

  return (
    <div className="rounded-xl p-2 my-8">
      <h1 className="font-bold mb-6 text-2xl">My Organizations</h1>
      <div className="flex justify-start gap-6 md:gap-12 items-center">
        <img
          src={organization.imgLink || "/logo.png"}
          alt={organization.name}
          width={1000}
          height={1000}
          className="w-24"
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
        />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold uppercase">{organization.name}</h2>
          <p className="italics text-sm">{organization.description}</p>
        </div>
      </div>

      <Button
        extra="bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold text-black mx-auto text-black"
        onClick={handleCreateVoting}>
        Create Voting
      </Button>
    </div>
  );
};

export default OrganizationDetails;
