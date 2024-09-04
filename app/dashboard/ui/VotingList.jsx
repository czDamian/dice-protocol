"use client";
import { useState, useEffect } from "react";
import Button from "@/app/ui/Button";
import Image from "next/image";
import Search from "./Search";
import Cookies from "js-cookie";

const VotingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [formData, setFormData] = useState({
    imgLink: "",
    name: "",
    description: "",
    owner: "", // Will be set using id from cookies
  });

  useEffect(() => {
    const fetchOrganization = async () => {
      const userInfo = Cookies.get("userInfo"); // Fetch userInfo from cookies

      if (userInfo) {
        try {
          const { id } = JSON.parse(userInfo);
          const response = await fetch(`/api/create-organization?id=${id}`);
          const data = await response.json();
          console.log(data.org, "org");

          if (response.ok) {
            if (data.org) {
              setOrganization(data.org);
            } else {
              console.error("No organization found.");
            }
          } else {
            console.error(data.message || "Failed to fetch organization");
          }
        } catch (error) {
          console.error("Error fetching organization:", error);
        }
      } else {
        console.error("User information not found in cookies.");
      }
    };

    fetchOrganization();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createOrganization = async () => {
    const userInfo = Cookies.get("userInfo");
    if (!userInfo) {
      console.error(
        "User information not found in cookies. Unable to create organization."
      );
      return;
    }

    const { id } = JSON.parse(userInfo);
    const updatedFormData = { ...formData, owner: id };

    try {
      const response = await fetch("/api/create-organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.organization) {
          console.log("Organization created successfully!");
          setOrganization(data.organization);
          setShowModal(false);
        } else {
          console.error("Organization creation failed. No data returned.");
        }
      } else {
        console.error(data.message || "Failed to create organization");
      }
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <div>
      {/* voting navigation - open, closed, etc */}
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

      {!organization ? (
        <div className="mx-auto pt-8 w-96 flex flex-col gap-2">
          <Image
            src="/noVote.png"
            width={1000}
            height={1000}
            alt="no vote found"
            className="mx-auto"
          />
          <p className="text-center text-sm">
            It looks like there aren&apos;t any votes at the moment. But
            don&apos;t worry, you can create your own
          </p>
          <Button
            extra="bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold text-black mx-auto text-black"
            onClick={() => setShowModal(true)}
          >
            <span>Create Organization</span>
          </Button>
        </div>
      ) : (
        <div className=" rounded-xl p-2 my-8">
          <h1 className="font-bold mb-6 text-2xl">My Organization</h1>
          <div className="flex justify-start gap-6 md:gap-12 items-center">
            <Image
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
              <h2 className="text-xl font-bold uppercase">
                {organization.name}
              </h2>
              <p className="italics text-sm">{organization.description}</p>
            </div>
          </div>

          <Button extra="bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold text-black mx-auto text-black">
            Create Voting
          </Button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-gray-950 mx-4 max-w-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Create New Organization</h2>
            <input
              type="text"
              name="imgLink"
              placeholder="Image Link"
              value={formData.imgLink}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <input
              type="text"
              name="name"
              placeholder="Organization Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <textarea
              name="description"
              placeholder="Description of your organization"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <div className="flex justify-between mt-4">
              <Button
                extra="bg-gray-800 text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                extra="bg-white text-black font-bold"
                onClick={createOrganization}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingList;
