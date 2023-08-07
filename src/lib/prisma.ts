import { encryptPassword } from "@/utils/bcrypt";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma?.$extends({
    result: {
      image: {
        url: {
          needs: { imageURL: true },
          compute(image) {
            return `localhost:3000/galleries/${image.imageURL}`;
          },
        },
      },
    },
  }) ??
  new PrismaClient().$extends({
    result: {
      image: {
        url: {
          needs: { imageURL: true },
          compute(image) {
            return `localhost:3000/galleries/${image.imageURL}`;
          },
        },
      },
    },
  });

async function seed() {
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
}

seed();

export { prisma };
