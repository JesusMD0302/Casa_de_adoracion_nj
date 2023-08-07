import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/schemas/schemas";
import { prisma } from "@/lib/prisma";
import { DataError, NoDataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";
import { encryptPassword } from "@/utils/bcrypt";

export async function GET(req: NextRequest) {
  try {
    await ValidateAuthorization(req);

    const users = await prisma.user.findMany({
      select: {
        email: true,
        userID: true,
        userName: true,
      },
      where: {
        userID: {
          gt: 1,
        },
      },
    });
    if (users.length === 0) {
      throw new NoDataError("No hay usuarios");
    }

    return NextResponse.json({ data: { users } }, { status: 200 });
  } catch (error) {
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
      {
        data: {
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ValidateAuthorization(req);

    const body: { userName: string; email: string; password: string } =
      await req.json();

    userSchema.parse(body);

    const userFound = await prisma.user.count({
      where: {
        email: body.email,
      },
    });

    if (userFound > 0) throw new DataError("Usuario ya registrado");

    const encryptedPassword = await encryptPassword(body.password)

    const newUser = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        password: encryptedPassword,
      },
    });

    return NextResponse.json({ data: { user: newUser } }, { status: 200 });
  } catch (error) {
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

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          data: {
            errors: error.issues.map((issue) => ({ message: issue.message })),
          },
        },
        { status: 400 }
      );
    }

    if (error instanceof DataError) {
      return NextResponse.json(
        {
          data: {
            errors: [{ message: error.message }],
          },
        },
        {
          status: 400,
        }
      );
    }

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
