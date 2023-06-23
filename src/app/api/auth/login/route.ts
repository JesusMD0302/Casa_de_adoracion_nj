import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { DataError } from "@/utils/errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
      select: {
        email: true,
        password: true,
        userName: true,
      },
    });

    if (!user) {
      throw new DataError("Usuario no registrado");
    }

    const token = jwt.sign(
      {
        ...user,
      },
      process.env.SECRET_KEY ?? "",
      {
        expiresIn: 60 * 60 * 24 * 30,
      }
    );

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json(
      { data: { user } },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized,
        },
      }
    );
  } catch (error) {
    console.log(error);

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
