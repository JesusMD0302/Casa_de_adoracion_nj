import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NoDataError } from "@/utils/errors";

export async function GET(req: NextRequest) {
  try {
    const psalms = await prisma.weekPsalm.findMany();
    if (psalms.length === 0) {
      throw new NoDataError("No se encontro el salmo semanal");
    }

    const weekPsalm = psalms[0];

    return NextResponse.json({ data: { weekPsalm } }, { status: 200 });
  } catch (error) {
    if (error instanceof NoDataError) {
      return NextResponse.json(
        {
          data: {
            errors: [{ message: error.message }],
          },
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        data: {
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
