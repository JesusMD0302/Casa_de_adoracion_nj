import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json({data: {events}}, {status: 200});
}
