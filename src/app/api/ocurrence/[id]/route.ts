import Occurrence from "@/app/models/Occurrence";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
  try {
    await dbConnect();
    const { _id } = params;
    console.log("bateu aqui");

    const occurrence = await Occurrence.findById(_id);
    if (!occurrence) {
      return NextResponse.json(
        { message: "Occurrence not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ occurrence });
  } catch (error) {
    console.error("Error getting occurrence:", error);
    return NextResponse.json(
      { message: "Error getting occurrence", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }) {
  try {
    await dbConnect();
    const { _id } = params;

    const occurrence = await Occurrence.findByIdAndDelete(_id);
    if (!occurrence) {
      return NextResponse.json(
        { message: "Occurrence not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Occurrence deleted successfully" });
  } catch (error) {
    console.error("Error deleting occurrence:", error);
    return NextResponse.json(
      { message: "Error deleting occurrence", error },
      { status: 500 }
    );
  }
}
