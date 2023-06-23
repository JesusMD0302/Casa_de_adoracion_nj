import { NoDataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    ValidateAuthorization(req);

    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    
    if (events.length === 0) {
      throw new NoDataError("No hay eventos cercanos");
    }
    return NextResponse.json({ data: { events } }, { status: 200 });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          data: {
            errors: error.message,
          },
        },
        { status: 401 }
      );
    }
    
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
