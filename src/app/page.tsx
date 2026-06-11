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
    <table>
      <thead>
        <tr>
          <th>RANK</th>
          <th>TAG</th>
          <th>SCORE</th>
          <th>DATE</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id}>
            <td>{index + 1}</td>
            <td>{score.tag}</td>
            <td>{score.score}</td>
            <td>{score.createdAt.toLocaleDateString()} {score.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
}