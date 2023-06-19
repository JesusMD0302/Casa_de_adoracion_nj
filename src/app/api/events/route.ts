import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { eventSchema } from "@/schemas/schemas";
import { prisma } from "@/lib/prisma";
import moment from "moment";
import { NoDataError } from "@/utils/errors";

export async function GET(req: Request) {
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

export async function POST(req: Request) {
  const body: { title: string; description: string; ubication: string } =
    await req.json();

  try {
    eventSchema.parse(body);

    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        ubication: body.description,
        startDate: moment().add(1, "days").format().toString(),
      },
    });

    return NextResponse.json({ data: { event: newEvent } }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          data: {
            errors: error.issues.map((issue) => ({ message: issue.message })),
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
