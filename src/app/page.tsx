import prisma from "@/lib/prisma";
import { Press_Start_2P } from "next/font/google";
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default async function Page() {
  const scores = await prisma.score.findMany({
    orderBy: { score: "desc" },
  });

  return <main className={`${pixelFont.className} flex flex-col items-center justify-center min-h-screen gap-8`}>
    <h1 className="text-4xl">THE LAST CHECKPOINT</h1>
    <h1>HIGH SCORES</h1>
      <div className="flex justify-between gap-8 w-full max-w-md">
        <span className="w-12">RANK</span>
        <span className="w-50">TAG</span>
        <span className="w-20">SCORE</span>
      </div>    
    {scores.map((score, index) => (
      <div key={score.id} className="flex justify-between gap-8 w-full max-w-md">
        <span className="w-12">{index + 1}</span>
        <span className="w-50">{score.tag.slice(0, 12)}</span>
        <span className="w-20">{score.score}</span>
      </div>
    ))}
  </main>
}