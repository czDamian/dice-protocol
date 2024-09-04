// register and login route for DAOs
import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/Users";
import UAParser from "ua-parser-js";

await connectDb();

export async function POST(request) {
  const { walletAddress } = await request.json();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",").shift() ||
    request.headers.get("remote-address");
  const userAgent = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "Direct";

  const parser = new UAParser(userAgent);
  const parsedUA = parser.getResult();

  const browser = parsedUA.browser.name || "Unknown Browser";
  const os = parsedUA.os.name || "Unknown OS";
  const device = parsedUA.device.model || "Desktop";

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Wallet address is missing" },
      { status: 400 }
    );
  }

  const upperCaseWalletAddress = walletAddress.toUpperCase();

try {
  let user = await User.findOne({ walletAddress: upperCaseWalletAddress });
  if (user) {
    console.log("user logged in as:", walletAddress);
    return NextResponse.json(
      {
        message: "Login Successful",
        address: user.walletAddress,
        id: user._id,
      },
      { status: 200 }
    );
  }

  if (
    upperCaseWalletAddress.length < 30 ||
    upperCaseWalletAddress.length > 50 ||
    !upperCaseWalletAddress.startsWith("0X")
  ) {
    console.log("invalid wallet address:", upperCaseWalletAddress);
    return NextResponse.json({ error: "Invalid ERC wallet" }, { status: 400 });
  }

  user = new User({
    walletAddress: upperCaseWalletAddress,
    ip,
    browser,
    os,
    device,
    referer,
  });

  await user.save();

  return NextResponse.json(
    { message: "Voter registered successfully", user },
    { status: 201 }
  );
} catch (err) {
  console.error("Error registering user:", err);
  return NextResponse.json({ error: err.message }, { status: 500 });
}
}

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    let user = await User.findOne({ walletAddress: id });
    return NextResponse.json({ user }, { status: 200 });
  }
  let users = await User.find();
  if (users) {
    return NextResponse.json({ users }, { status: 200 });
  } else {
    return NextResponse.json({ message: "No user found" }, { status: 400 });
  }
}
