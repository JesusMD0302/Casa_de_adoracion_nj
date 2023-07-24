import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
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
  const defaultAdmin = await prisma.user.upsert({
    where: {
      userID: 1,
    },
    update: {},
    create: {
      email: "defaultadmin@casanj.com",
      password: "adminpassword123",
      userName: "DefaultAdmin",
    },
  });

  const childrenGallery = await prisma.gallery.upsert({
    where: { galleryID: 1 },
    update: {},
    create: { name: "Niños" },
  });

  const menGallery = await prisma.gallery.upsert({
    where: { galleryID: 2 },
    update: {},
    create: { name: "Hombres" },
  });

  const womenGallery = await prisma.gallery.upsert({
    where: { galleryID: 3 },
    update: {},
    create: { name: "Mujeres" },
  });

  const specialGallery = await prisma.gallery.upsert({
    where: { galleryID: 4 },
    update: {},
    create: { name: "Especiales" },
  });

  const defaultPsalm = await prisma.weekPsalm.upsert({
    where: { PsalmID: 1 },
    update: {},
    create: {
      content: "<p>Salmo semanal</p>",
    },
  });
}

seed();

export { prisma };
