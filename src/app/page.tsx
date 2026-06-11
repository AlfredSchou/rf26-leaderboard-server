import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
  const scores = await prisma.score.findMany({
    orderBy: { score: "desc" },
  });

  return <div>{JSON.stringify(scores)}</div>;
}