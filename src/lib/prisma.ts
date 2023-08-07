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

export { prisma };
