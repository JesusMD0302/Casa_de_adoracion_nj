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

async function createData() {
  try {
    const user = await checUser();
    const childrenGallery = await checFirstGallery();
    const menGallery = await checSecondGallery();
    const womenGallery = await checThirdGallery();
    const specialGallery = await checFourtGallery();
    const psalm = await checPsalm();

    return {
      user,
      childrenGallery,
      menGallery,
      womenGallery,
      specialGallery,
      psalm,
    };
  } catch (error) {
    console.log(error);
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

createData().then((res) => console.log(res));

export { prisma };
