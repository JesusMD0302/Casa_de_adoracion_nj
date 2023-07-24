import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function PUT(
  req: NextRequest,
  { params }: { params: { psalmID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestPsalmID = params.psalmID;

    const psalmID = Number(requestPsalmID);

    if (isNaN(psalmID) || psalmID === 0) {
      throw new DataError("El id no existe");
    }
    const body: { content: string } = await req.json();

    const weekPsalm = await prisma.weekPsalm.update({
      where: { PsalmID: psalmID },
      data: {
        content: body.content,
      },
    });

    return NextResponse.json({ data: { weekPsalm } }, { status: 200 });
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

    if (error instanceof DataError) {
      return NextResponse.json(
        {
          data: {
            errors: [{ message: error.message }],
          },
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
