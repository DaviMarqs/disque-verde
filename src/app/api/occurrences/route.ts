import Occurrence from "@/app/models/Occurrence";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const occurrences = await Occurrence.find({});
    return NextResponse.json({ occurrences });
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
      image: data.image,
      status: data.status || "PENDING",
      informer_name: data.informer_name,
      informer_email: data.informer_email,
      informer_phone: data.informer_phone,
      informer_address: data.informer_address,
      informer_anonymous: data.informer_anonymous,
      offender_name: data.offender_name,
      offender_email: data.offender_email,
      offender_phone: data.offender_phone,
      offender_address: data.offender_address,
      occurrence_date_and_time: data.occurrence_date_and_time,
      occurrence_location: data.occurrence_location,
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
