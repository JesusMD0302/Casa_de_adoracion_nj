import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { gallerySchema } from "@/schemas/schemas";
import { ZodError } from "zod";
import { DataError, NoDataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(req: NextRequest) {
  try {
    const galleries = await prisma.gallery.findMany({
      include: { Images: true },
    });

    if (galleries.length === 0) {
      throw new NoDataError("No hay galerrías");
    }

    return NextResponse.json(
      { data: { galleries: galleries } },
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

export async function POST(req: NextRequest) {
  try {
    await ValidateAuthorization(req);

    const body: { name: string } = await req.json();

    gallerySchema.parse(body);

    const galleryFound = await prisma.gallery.count({
      where: {
        name: body.name,
      },
    });

    if (galleryFound > 0) throw new DataError("La gallery ya existe");

    const newGallery = await prisma.gallery.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { data: { gallery: newGallery } },
      { status: 200 }
    );
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
      {
        data: { message: "Internal server error" },
      },
      { status: 500 }
    );
  }
}
