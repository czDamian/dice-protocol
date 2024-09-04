//PUT route for editing organizations
import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Organization from "@/models/Organization";

await connectDb();

export async function PUT(request, { params }) {

  const id = params.id;
  const { imgLink, name, description, owner } = await request.json();

  if (!id || !imgLink || !name || !description || !owner) {
    return NextResponse.json(
      {
        error:
          "All fields are required",
      },
      { status: 400 }
    );
  }

  try {
    if (name.length < 2) {
      return NextResponse.json(
        { error: "Organization name is too short" },
        { status: 400 }
      );
    }

    let organization = await Organization.findById(id);
    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    organization.imgLink = imgLink;
    organization.name = name;
    organization.description = description;
    organization.owner = owner;

    await organization.save();

    return NextResponse.json(
      { message: "Organization updated successfully", organization },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating organization:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}