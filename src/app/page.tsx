import prisma from "@/lib/prisma";
import { Press_Start_2P } from "next/font/google";
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default async function Page() {
  const scores = await prisma.score.findMany({
    orderBy: { score: "desc" },
  });

  return <main className={`${pixelFont.className} flex flex-col items-center justify-center min-h-screen gap-8`}>
    <h1>HIGH SCORES</h1>
      <div className="flex justify-between gap-8 w-full max-w-md">
        <th className="px-16">RANK</th>
        <th className="px-16">TAG</th>
        <th className="px-16">SCORE</th>
      </div>    
    {scores.map((score, index) => (
      <tr key={score.id}>
        <div className="flex justify-between gap-8 w-full max-w-md">
          <span>{index + 1}</span>
          <span>{score.tag.slice(0, 12)}</span>
          <span>{score.score}</span>
        </div>
      </tr>
    ))}
  </main>
}