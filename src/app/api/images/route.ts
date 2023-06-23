import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { NoDataError, ValidateFormDataError } from "@/utils/errors";
import { ValidateFormData } from "@/lib/validator";

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
    const data = await req.formData();

    const { file, galleryId } = ValidateFormData(data);

    const bytes = await file?.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const filePath = path.join(process.cwd(), "public/galleries", fileName);

    writeFile(filePath, buffer, (err) => {
      if (err) throw err;
      console.log(`The file ${fileName} has been saved!`);
    });

    const newImage = await prisma.image.create({
      data: {
        galery: { connect: { galleryID: galleryId } },
        imageURL: fileName,
      },
    });

    return NextResponse.json({ data: { image: newImage } }, { status: 200 });
  } catch (error: any) {
    if (error instanceof ValidateFormDataError) {
      return NextResponse.json(
        { data: { errors: error.issues } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
