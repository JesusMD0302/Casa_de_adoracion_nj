import { prisma } from "@/lib/prisma";
import { encryptPassword } from "@/utils/bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await checUser()
    await checFirstGallery()
    await checSecondGallery()
    await checThirdGallery()
    await checFourtGallery()
    await checPsalm()

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

const checUser = async () => {
  const encryptedPassword = await encryptPassword(
    process.env.ADMIN_USER_PASSWORD ?? "adminPassword123"
  );

  const user = await prisma.user.findUnique({
    where: {
      userID: 1,
    },
  });

  if (user) {
    throw new Error("Ya existe el usuario");
  }

  const defaultAdmin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_USER_EMAIL ?? "defaultadmin@casanj.com",
      password: encryptedPassword,
      userName: "DefaultAdmin",
    },
  });
};
const checFirstGallery = async () => {
  const gallery = await prisma.gallery.findUnique({
    where: { galleryID: 1 },
  });

  if (gallery) {
    throw new Error("Ya existe la galería");
  }

  const childrenGallery = await prisma.gallery.create({
    data: { name: "Niños" },
  });
};
const checSecondGallery = async () => {
  const gallery = await prisma.gallery.findUnique({
    where: { galleryID: 2 },
  });

  if (gallery) {
    throw new Error("Ya existe la galería");
  }

  const menGallery = await prisma.gallery.create({
    data: { name: "Hombres" },
  });
};
const checThirdGallery = async () => {
  const gallery = await prisma.gallery.findUnique({
    where: { galleryID: 3 },
  });

  if (gallery) {
    throw new Error("Ya existe la galería");
  }

  const womenGallery = await prisma.gallery.create({
    data: { name: "Mujeres" },
  });
};
const checFourtGallery = async () => {
  const gallery = await prisma.gallery.findUnique({
    where: { galleryID: 4 },
  });

  if (gallery) {
    throw new Error("Ya existe la galería");
  }

  const specialGallery = await prisma.gallery.create({
    data: { name: "Especiales" },
  });
};
const checPsalm = async () => {
  const psalm = await prisma.weekPsalm.findUnique({
    where: { PsalmID: 1 },
  });

  if (psalm) {
    throw new Error("Ya existe el salmo");
  }

  const defaultPsalm = await prisma.weekPsalm.create({
    data: {
      content: "<p>Salmo semanal</p>",
    },
  });
};
