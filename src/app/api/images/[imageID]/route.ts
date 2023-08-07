import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(
  req: NextRequest,
  { params }: { params: { imageID: string } }
) {
  try {
    await ValidateAuthorization(req);

    const requestImageID = params.imageID;
    const galleryID = Number(requestImageID);
    if (isNaN(galleryID) || galleryID < 1) {
      throw new DataError("El id no existe");
    }

    const image = await prisma.image.findUnique({
      where: { imageID: galleryID },
    });

    if (image == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { image } }, { status: 200 });
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
  { params }: { params: { imageID: string } }
) {
  try {
    await ValidateAuthorization(req);

    const requestImageID = params.imageID;

    const imageID = Number(requestImageID);

    if (isNaN(imageID) || imageID == 0) {
      throw new DataError("El id no existe");
    }

    const res = await prisma.image.delete({
      where: {
        imageID: imageID,
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
