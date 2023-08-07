import { prisma } from "@/lib/prisma";
import { encryptPassword } from "@/utils/bcrypt";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
  try {
    const encryptedPassword = await encryptPassword("adminPassword123");

    const defaultAdmin = await prisma.user.upsert({
      where: {
        userID: 1,
      },
      update: {
        password: encryptedPassword,
      },
      create: {
        email: "defaultadmin@casanj.com",
        password: encryptedPassword,
        userName: "DefaultAdmin",
      },
    });

    const childrenGallery = await prisma.gallery.upsert({
      where: { galleryID: 1 },
      update: { name: "Niños" },
      create: { name: "Niños" },
    });

    const menGallery = await prisma.gallery.upsert({
      where: { galleryID: 2 },
      update: { name: "Hombres" },
      create: { name: "Hombres" },
    });

    const womenGallery = await prisma.gallery.upsert({
      where: { galleryID: 3 },
      update: { name: "Mujeres" },
      create: { name: "Mujeres" },
    });

    const specialGallery = await prisma.gallery.upsert({
      where: { galleryID: 4 },
      update: { name: "Especiales" },
      create: { name: "Especiales" },
    });

    const defaultPsalm = await prisma.weekPsalm.upsert({
      where: { PsalmID: 1 },
      update: {
        content: "<p>Salmo semanal</p>",
      },
      create: {
        content: "<p>Salmo semanal</p>",
      },
    });

    return NextResponse.json({ message: "Data is al ready" }, { status: 200 });
  } catch (error) {
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
// Exporta el objeto config
export const config = {
  api: {
    // Desactiva el análisis automático del cuerpo de la petición
    bodyParser: false,
    // Activa los encabezados CORS
    cors: true,
  },
};
