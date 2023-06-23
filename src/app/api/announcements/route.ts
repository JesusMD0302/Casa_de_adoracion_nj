import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NoDataError } from "@/utils/errors";
import { announcementSchema } from "@/schemas/schemas";
import { ValidateDate } from "@/utils/validateDate";

export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        activities: {
          select: {
            name: true,
          },
        },
      },
    });

    if (announcements.length === 0) throw new NoDataError("No hay avisos");

    return NextResponse.json(
      {
        data: {
          announcements,
        },
      },
      { status: 200 }
    );
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    body.announcementDate = ValidateDate(body.announcementDate);

    const { title, announcementDate, activities } =
      announcementSchema.parse(body);

    let newAnnouncement: Prisma.AnnouncementCreateInput;

    newAnnouncement = {
      title,
      announcementDate,
      activities: {
        create: activities,
      },
    };

    const createdAnnouncement = await prisma.announcement.create({
      data: newAnnouncement,
      include: {
        activities: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: {
          announcement: createdAnnouncement,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);

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
        data: {
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}
