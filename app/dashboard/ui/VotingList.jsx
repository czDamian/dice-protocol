"use client";
import { useState, useEffect } from "react";
import Button from "@/app/ui/Button";
import Image from "next/image";
import Search from "./Search";
import Cookies from "js-cookie";
import OrganizationModal from "./OrganizationModal";
import OrganizationDetails from "./OrganizationDetails";

const VotingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [formData, setFormData] = useState({
    imgLink: "",
    name: "",
    description: "",
    owner: "",
  });

  useEffect(() => {
    const fetchOrganization = async () => {
      const userInfo = Cookies.get("userInfo");

      if (userInfo) {
        try {
          const { id } = JSON.parse(userInfo);
          const { id } = JSON.parse(userInfo);
          const response = await fetch(`/api/create-organization?id=${id}`);
          const data = await response.json();
          if (response.ok) {
            if (data.org) {
              setOrganization(data.org);
            } else {
              console.error("No organization found.");
            }
          } else {
            console.error(data.error || "Failed to fetch organization");
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
      return "User information not found in cookies. Unable to create organization.";
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
          setOrganization(data.organization);
          return null; // Success
        } else {
          return "Organization creation failed. No data returned.";
        }
      } else {
        return data.error || "Failed to create organization";
      }
    } catch (error) {
      return "Error creating organization: " + error.message;
    }
  };

  return (
    <div>
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

      {/* Display OrganizationDetails if organization exists */}
      {organization ? (
        <OrganizationDetails
          organization={organization}
          setShowModal={setShowModal}
        />
      ) : (
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
      )}

      <OrganizationModal
        showModal={showModal}
        setShowModal={setShowModal}
        createOrganization={createOrganization}
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default VotingList;
