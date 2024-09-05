// POST route to register an organization

import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Organization from "@/models/Organization";

await connectDb();

export async function POST(request) {
  try {
    const { imgLink, name, description, owner } = await request.json();

    if (!imgLink || !name || !description || !owner) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        { error: "Organization name is too short" },
        { status: 400 }
      );
    }

    if (description.length < 30) {
      return NextResponse.json(
        { error: "Description is too short" },
        { status: 400 }
      );
    }

    if (imgLink.length < 20) {
      return NextResponse.json(
        { error: "Image link is too short" },
        { status: 400 }
      );
    }

    const existingOrganization = await Organization.findOne({ name });
    if (existingOrganization) {
      return NextResponse.json(
        { error: "Organization with this name already exists" },
        { status: 400 }
      );
    }

    const organization = new Organization({
      imgLink,
      name,
      description,
      owner,
    });

    await organization.save();

    return NextResponse.json(
      { message: "Organization created successfully", organization },
      { status: 201 }
    );
  } catch (err) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation Error", message: err.message },
        { status: 400 }
      );
    } else if (err.code === 11000) {
      return NextResponse.json(
        { error: "Duplicate entry", message: "Organization already exists" },
        { status: 400 }
      );
    } else {
      console.error("Error creating organization:", err);
      return NextResponse.json(
        { error: "Internal Server Error", message: err.message },
        { status: 500 }
      );
    }
  }
}

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    try {
      const org = await Organization.findOne({ owner: id });
      if (org) {
        return NextResponse.json({ org }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "No organization found for this user" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  } else {
    try {
      const orgs = await Organization.find();
      if (orgs.length > 0) {
        return NextResponse.json({ organizations: orgs }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "No organizations found" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }
}

// app/api/create-organization/route.js
//PUT /api/create-organization?id=123 to update
export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const { imgLink, name, description, owner } = await request.json();

  if (!id || !imgLink || !name || !description || !owner) {
    return NextResponse.json(
      {
        error: "All fields are required",
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
