import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tag, score } = body;

    const normalizedTag = typeof tag === "string" ? tag.trim() : "";
    const normalizedScore =
      typeof score === "number"
        ? score
        : typeof score === "string"
          ? Number(score)
          : NaN;

    if (!normalizedTag || !Number.isInteger(normalizedScore)) {
      return NextResponse.json(
        { error: "Invalid payload. Expected { tag: string, score: integer }." },
        { status: 400 }
      );
    }

    const savedScore = await prisma.score.create({
      data: {
        tag: normalizedTag,
        score: normalizedScore,
      },
    });

    return NextResponse.json({ ok: true, score: savedScore }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save score." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const scores = await prisma.score.findMany({
      orderBy: { score: "desc" },
      take: 10,
    });

    return NextResponse.json({ ok: true, scores }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch scores." }, { status: 500 });
  }
}