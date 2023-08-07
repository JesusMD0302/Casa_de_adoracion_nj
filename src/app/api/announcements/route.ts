import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { NoDataError } from "@/utils/errors";
import { announcementSchema } from "@/schemas/schemas";
import { ValidateDate } from "@/utils/validateDate";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        announcementDate: {
          gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      },
      orderBy: {
        announcementDate: "asc",
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
    await ValidateAuthorization(req);

    const body = await req.json();

    body.announcementDate = ValidateDate(body.announcementDate);

    const { title, announcementDate, announcementDescription, isImportant } =
      announcementSchema.parse(body);

    const createdAnnouncement = await prisma.announcement.create({
      data: {
        title,
        announcementDate,
        announcementDescription,
        isImportant,
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
