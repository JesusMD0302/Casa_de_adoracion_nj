import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import multer from "multer";
import {
  NoDataError,
  UnauthorizedError,
  ValidateFormDataError,
} from "@/utils/errors";
import { ValidateFormData } from "@/lib/validator";
import { ValidateAuthorization } from "@/utils/validateAuthorization";

export async function GET(req: NextRequest) {
  try {
    const images = await prisma.image.findMany();

    if (images.length === 0) {
      throw new NoDataError("No hay imagenes");
    }

    return NextResponse.json({ data: { images: images } }, { status: 200 });
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
    await ValidateAuthorization(req);

    const data = await req.formData();
    const newForm = new FormData();
    let images: any[] = [];

    const { files, galleryId } = ValidateFormData(data);

    for (const file in files) {
      newForm.append("file", file);
    }

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dadsaghlt/upload",
      {
        method: "POST",
        body: newForm,
      }
    );

    if (response.ok) {
      const data = await response.json();
      const urls = (data.resources as []).map(
        (resource: any) => resource.secure_url
      );

      for await (const url of urls) {
        try {
          const res = await prisma.image.create({
            data: {
              galery: {
                connect: {
                  galleryID: galleryId,
                },
              },
              imageURL: url,
            },
          });
          images = [...images, res];
        } catch (error) {}
      }
    } else {
      return NextResponse.json(
        { error: "Error al subir las imágenes a Cloudinary" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { images } });
  } catch (error: any) {
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

    if (error instanceof ValidateFormDataError) {
      return NextResponse.json(
        { data: { errors: error.issues } },
        { status: 400 }
      );
    }

    console.log(error);

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
