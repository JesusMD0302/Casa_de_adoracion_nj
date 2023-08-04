import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { DataError } from "@/utils/errors";
import { comparePassword } from "@/utils/bcrypt";
import { loginSchema } from "@/schemas/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {email: emailReceived, password} = loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: emailReceived,
      },
      select: {
        userID: true,
        email: true,
        userName: true,
        password: true,
      },
    });
    if (!user) {
      throw new DataError("Usuario no registrado");
    }

    const verifiedPassword = await comparePassword(password, user.password)

    if (!verifiedPassword) {
      throw new DataError("Contraseña inconrrecta");
    }

    const { userID, email, userName } = user;

    const token = jwt.sign(
      {
        userID,
        email,
        userName,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: 60 * 60 * 24 * 30,
      }
    );

    return NextResponse.json(
      { data: { user: { userID, userName, email, accessToken: token } } },
      {
        status: 200,
      }
    );
  } catch (error) {
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
