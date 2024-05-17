import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Server is Running!" });
  } catch (error) {
    console.log(error, "Error when connecting to the database.");
    return NextResponse.json({
      message: "Error when connecting to the database.",
      error,
    });
  }
}