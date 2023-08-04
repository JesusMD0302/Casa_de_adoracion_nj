import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";
import { ValidateDate } from "@/utils/validateDate";
import { announcementSchema } from "@/schemas/schemas";

export async function GET(
  req: NextRequest,
  { params }: { params: { announcementID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestAnnouncementID = params.announcementID;
    const announcementID = Number(requestAnnouncementID);
    if (isNaN(announcementID) || announcementID < 1) {
      throw new DataError("El id no existe");
    }

    const announcement = await prisma.announcement.findUnique({
      where: { announcementID: announcementID },
    });

    if (announcement == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { announcement } }, { status: 200 });
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { announcementID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestAnnouncementID = params.announcementID;

    const announcementID = Number(requestAnnouncementID);

    if (isNaN(announcementID) || announcementID == 0) {
      throw new DataError("El id no existe");
    }
    const body = await req.json();

    body.announcementDate = ValidateDate(body.announcementDate);

    const { title, announcementDate, announcementDescription, isImportant } =
      announcementSchema.parse(body);

    const announcement = await prisma.announcement.update({
      where: { announcementID: announcementID },
      data: {
        title,
        announcementDate,
        announcementDescription,
        isImportant
      },
    });

    return NextResponse.json({ data: { announcement } }, { status: 200 });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { announcementID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestAnnouncementID = params.announcementID;

    const announcementID = Number(requestAnnouncementID);

    if (isNaN(announcementID) || announcementID == 0) {
      throw new DataError("El id no existe");
    }

    const res = await prisma.announcement.delete({
      where: {
        announcementID: announcementID,
      },
    });

    return NextResponse.json({ elementDeleted: res }, { status: 200 });
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
