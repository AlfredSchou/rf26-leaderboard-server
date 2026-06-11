import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { verifyScore } from "../../../lib/hmac";
import { containsProfanity } from "@/lib/profanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tag, score, signature, nonce } = body;

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

    if (containsProfanity(normalizedTag)) {
      return NextResponse.json(
        { error: "Tag contains profanity." },
        { status: 400 }
      );
    }
    
    if (!verifyScore(normalizedScore, signature, nonce)) {
      return NextResponse.json({ error: "Invalid score signature." }, { status: 400 });
    }

    if (await prisma.nonce.findUnique({ where: { nonce } })) {
      return NextResponse.json({ error: "Nonce has already been used." }, { status: 400 });
    }

    const savedScore = await prisma.score.create({
      data: {
        tag: normalizedTag,
        score: normalizedScore,
      },
    });

    await prisma.nonce.create({ data: { nonce } });

    return NextResponse.json({ ok: true, score: savedScore }, { status: 201 });
  } catch (error) {
    console.error(error);
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