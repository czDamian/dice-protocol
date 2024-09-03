//model for registering organizations

import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    imgLink: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
delete mongoose.models.Organization;

const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", organizationSchema);

export default Organization;
