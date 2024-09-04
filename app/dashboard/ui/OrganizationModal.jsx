"use client";
import { useState } from "react";
import Button from "@/app/ui/Button";

const OrganizationModal = ({
  showModal,
  setShowModal,
  createOrganization,
  formData,
  handleInputChange,
}) => {
  const [error, setError] = useState("");

  const handleCreateOrganization = async () => {
    const error = await createOrganization();
    if (error) {
      setError(error);
    } else {
      setShowModal(false);
      setError("");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-gray-950 mx-4 max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Create New Organization</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input
          type="text"
          name="imgLink"
          placeholder="Image Link"
          value={formData.imgLink}
          minLength={20}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <input
          type="text"
          name="name"
          minLength={3}
          placeholder="Organization Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <textarea
          name="description"
          placeholder="Description of your organization"
          value={formData.description}
          minLength={30}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <div className="flex justify-between mt-4">
          <Button
            extra="bg-gray-800 text-white"
            onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            extra="bg-white text-black font-bold"
            onClick={handleCreateOrganization}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationModal;
