import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {
    const {id: rawId} = await params;
    const id = Number(rawId);
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    
    if (!adminSession || adminSession !== process.env.ADMIN_SECRET) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    if (isNaN(id)) {
        return NextResponse.json({error: "Invalid ID"}, {status: 400});
    }

    await prisma.score.delete({where: {id}});
    return NextResponse.json({ok: true});
}