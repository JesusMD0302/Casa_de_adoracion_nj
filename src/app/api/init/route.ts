import { prisma } from "@/lib/prisma";
import { encryptPassword } from "@/utils/bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await checUser();
    const childrenGallery = await checFirstGallery();
    const menGallery = await checSecondGallery();
    const womenGallery = await checThirdGallery();
    const specialGallery = await checFourtGallery();
    const psalm = await checPsalm();

    return NextResponse.json({ message: "Data is already" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

const checUser = async () => {
  const encryptedPassword = await encryptPassword(
    process.env.ADMIN_USER_PASSWORD ?? "adminPassword123"
  );
  const defaultAdmin = await prisma.user.upsert({
    where: {
      userID: 1,
    },
    create: {
      email: process.env.ADMIN_USER_EMAIL ?? "defaultadmin@casanj.com",
      password: encryptedPassword,
      userName: "DefaultAdmin",
    },
    update: {},
  });
};
const checFirstGallery = async () => {
  const childrenGallery = await prisma.gallery.upsert({
    where: { galleryID: 1 },
    create: { name: "Niños" },
    update: {},
  });
};
const checSecondGallery = async () => {
  const menGallery = await prisma.gallery.upsert({
    where: { galleryID: 2 },
    create: { name: "Hombres" },
    update: {},
  });
};
const checThirdGallery = async () => {
  const womenGallery = await prisma.gallery.upsert({
    where: { galleryID: 3 },
    create: { name: "Mujeres" },
    update: {},
  });
};
const checFourtGallery = async () => {
  const specialGallery = await prisma.gallery.upsert({
    where: { galleryID: 4 },
    create: { name: "Especiales" },
    update: {},
  });
};
const checPsalm = async () => {
  const defaultPsalm = await prisma.weekPsalm.upsert({
    where: { PsalmID: 1 },
    create: {
      content: "<p>Salmo semanal</p>",
    },
    update: {},
  });
};
