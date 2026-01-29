import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Note from "@/models/Note";
export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.body) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 },
      );
    }

    const newNote = await Note.create({
      title: body.title.trim(),
      body: body.body.trim(),
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Note creation failed" },
      { status: 500 },
    );
  }
}
