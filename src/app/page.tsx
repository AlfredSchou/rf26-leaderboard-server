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
    <table className="text-left">
      <thead>
        <tr>
          <th className="px-16">RANK</th>
          <th className="px-16">TAG</th>
          <th className="px-16">SCORE</th>
          <th className="px-16">DATE</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id}>
            <td className="px-16">{index + 1}</td>
            <td className="px-16">{score.tag}</td>
            <td className="px-16">{score.score}</td>
            <td className="px-16">{score.createdAt.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "2-digit" })} {score.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
}