import prisma from "@/lib/prisma";
import { Press_Start_2P } from "next/font/google";
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default async function Page() {
  const scores = await prisma.score.findMany({
    orderBy: { score: "desc" },
  });

  return <div className={pixelFont.className}>{JSON.stringify(scores)}</div>;
}