import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    imgLink: { type: String, required: true, minlength: 20 },
    name: { type: String, required: true, unique: true, minlength: 3 },
    description: { type: String, required: true, minlength: 30 },
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
