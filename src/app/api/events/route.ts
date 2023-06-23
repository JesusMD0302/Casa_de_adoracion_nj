import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { eventSchema } from "@/schemas/schemas";
import { prisma } from "@/lib/prisma";
import { NoDataError, UnauthorizedError } from "@/utils/errors";
import { ValidateDate } from "@/utils/validateDate";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    if (events.length === 0) {
      throw new NoDataError("No hay eventos cercanos");
    }

    const nextEvent = events.shift() ?? [];

    return NextResponse.json({ data: { nextEvent, events } }, { status: 200 });
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
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    ValidateAuthorization(req);

    const body = await req.json();

    body.startDate = ValidateDate(body.startDate);
    body.endDate = body.endDate && ValidateDate(body.endDate);

    const { title, description, ubication, startDate, endDate } =
      eventSchema.parse(body);

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        ubication,
        startDate,
        endDate,
      },
    });

    return NextResponse.json({ data: { event: newEvent } }, { status: 200 });
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

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          data: {
            errors: error.issues.map((issue) => ({
              message: issue.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: { message: "Internal server error" },
      },
      { status: 500 }
    );
  }
}
