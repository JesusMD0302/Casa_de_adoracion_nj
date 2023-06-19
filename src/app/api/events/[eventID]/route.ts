import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { eventSchema } from "@/schemas/schemas";
import { prisma } from "@/lib/prisma";
import { DataError } from "@/utils/errors";

export async function GET(
  req: Request,
  { params }: { params: { eventID: string } }
) {
  const requestEventID = params.eventID;

  const eventID = Number(requestEventID);

  try {
    if (isNaN(eventID) || eventID < 1) {
      throw new DataError("El id no existe");
    }

    const event = await prisma.event.findUnique({
      where: { eventID: eventID },
    });

    if (event == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { event } }, { status: 200 });
  } catch (error) {
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

export async function PUT(
  req: Request,
  { params }: { params: { eventID: string } }
) {
  const requestEventID = params.eventID;

  const eventID = Number(requestEventID);

  try {
    if (isNaN(eventID) || eventID == 0) {
      throw new DataError("El id no existe");
    }

    const body: { title: string; description: string; ubication: string } =
      await req.json();

    eventSchema.parse(body);

    const event = await prisma.event.update({
      where: { eventID: eventID },
      data: {
        title: body.title,
        description: body.description,
        ubication: body.ubication,
      },
    });
    return NextResponse.json({ data: { event } }, { status: 200 });
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

export async function DELETE(
  req: Request,
  { params }: { params: { eventID: string } }
) {
  const requestEventID = params.eventID;

  const eventID = Number(requestEventID);

  try {
    if (isNaN(eventID) || eventID == 0) {
      throw new DataError("El id no existe");
    }

    const res = await prisma.event.delete({
      where: {
        eventID: eventID,
      },
    });

    return NextResponse.json({ elementDeleted: res }, { status: 200 });
  } catch (error) {
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
