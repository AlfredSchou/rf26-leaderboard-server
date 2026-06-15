import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import EntryList from "./EntryList";


export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    if (!adminSession || adminSession !== process.env.ADMIN_SECRET) {
        return redirect("/admin");
    }

    const scores = await prisma.score.findMany({
        orderBy: { score: "desc" },
    });

    return <EntryList scores={scores} />;
}