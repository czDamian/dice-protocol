// POST route to register an organization

import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Organization from "@/models/Organization";

await connectDb();

export async function POST(request) {
  const { imgLink, name, description, owner } = await request.json();

  if (!imgLink || !name || !description || !owner) {
    return NextResponse.json(
      { error: "All fields are required" },
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

    let organization = await Organization.findOne({ name });
    if (organization) {
      return NextResponse.json(
        { error: "Organization with this name already exists" },
        { status: 400 }
      );
    }

    organization = new Organization({
      imgLink,
      name,
      description,
      owner,
    });
    await organization.save();
    console.log("organization created: ", organization);

    return NextResponse.json(
      { message: "Organization created successfully", organization },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating organization:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  let orgs = await Organization.find();
  if (orgs) {
    return NextResponse.json({ organizations: orgs }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "No organization found" },
      { status: 400 }
    );
  }
}
