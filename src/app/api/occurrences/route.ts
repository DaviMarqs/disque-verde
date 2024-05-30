import Occurrence from "@/app/models/Occurrence";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const id = searchParams.get("id"); // Novo parâmetro
    console.log(id, "id");

    if (id) {
      const occurrence = await Occurrence.findById(id);
      if (!occurrence) {
        return NextResponse.json(
          { message: "Occurrence not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ occurrence });
    } else {
      const skip = (page - 1) * limit;

      const totalOccurrences = await Occurrence.countDocuments({});
      const occurrences = await Occurrence.find({}).skip(skip).limit(limit);

      return NextResponse.json({
        occurrences,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalOccurrences / limit),
          totalOccurrences,
        },
      });
    }
  } catch (error) {
    console.error("Error getting occurrences:", error);
    return NextResponse.json(
      { message: "Error getting occurrences", error },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();

    const newOccurrence = new Occurrence({
      description: data.description,
      occurrence_type: data.occurrence_type,
      occurrence_date: data.occurrence_date,
      occurrence_time: data.occurrence_time,
      status: data.status || "PENDING",
      informer_name: data.informer_name,
      informer_email: data.informer_email,
      informer_phone: data.informer_phone,
      informer_address: data.informer_address,
      informer_anonymous: data.informer_anonymous,
      image: data.image,
    });

    await newOccurrence.save();

    return NextResponse.json({
      message: "Occurrence created successfully!",
      occurrence: newOccurrence,
    });
  } catch (error) {
    console.error("Error creating occurrence:", error);
    return NextResponse.json(
      { message: "Error creating occurrence", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Occurrence ID is required" },
        { status: 400 }
      );
    }

    const deletedOccurrence = await Occurrence.findByIdAndDelete(id);

    if (!deletedOccurrence) {
      return NextResponse.json(
        { message: "Occurrence not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Occurrence deleted successfully",
      occurrence: deletedOccurrence,
    });
  } catch (error) {
    console.error("Error deleting occurrence:", error);
    return NextResponse.json(
      { message: "Error deleting occurrence", error },
      { status: 500 }
    );
  }
}
