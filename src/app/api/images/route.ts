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
import { cloudinary } from "@/lib/cloudinary";

const upload = multer({ dest: "temp/" });

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

    const { files, galleryId } = ValidateFormData(data);

    upload.array("images")(
      req as any,
      NextResponse as any,
      async function (err) {
        if (err) {
          return NextResponse.json(
            { error: "Error al subir los archivos" },
            { status: 500 }
          );
        }

        const files = (req as any).images;
        const urls = [];

        for (const file of files) {
          const result = await cloudinary.uploader.upload(file.path);
          urls.push(result.secure_url);
        }

        return NextResponse.json({ urls }, { status: 200 });
      }
    );
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
