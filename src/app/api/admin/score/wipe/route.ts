import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    
    if (!adminSession || adminSession !== process.env.ADMIN_SECRET) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    await prisma.score.deleteMany({});
    return NextResponse.json({ok: true});
}