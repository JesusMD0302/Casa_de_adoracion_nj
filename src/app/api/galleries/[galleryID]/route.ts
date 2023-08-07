import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(
  req: NextRequest,
  { params }: { params: { galleryID: string } }
) {
  try {
    const requestGalleryID = params.galleryID;
    const galleryID = Number(requestGalleryID);
    if (isNaN(galleryID) || galleryID < 1) {
      throw new DataError("El id no existe");
    }

    const gallery = await prisma.gallery.findUnique({
      where: { galleryID: galleryID },
      include: {
        Images: true,
      },
    });

    if (gallery == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { gallery: gallery } }, { status: 200 });
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
  { params }: { params: { galleryID: string } }
) {
  try {
    await ValidateAuthorization(req);

    const requestGalleryID = params.galleryID;

    const galleryID = Number(requestGalleryID);

    if (isNaN(galleryID) || galleryID == 0) {
      throw new DataError("El id no existe");
    }
    const body: { name: string } = await req.json();

    const gallery = await prisma.gallery.update({
      where: { galleryID: galleryID },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({ data: { gallery: gallery } }, { status: 200 });
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
  { params }: { params: { galleryID: string } }
) {
  try {
    await ValidateAuthorization(req);

    const requestGalleryID = params.galleryID;

    const galleryID = Number(requestGalleryID);

    if (isNaN(galleryID) || galleryID == 0) {
      throw new DataError("El id no existe");
    }

    const res = await prisma.gallery.delete({
      where: {
        galleryID: galleryID,
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
