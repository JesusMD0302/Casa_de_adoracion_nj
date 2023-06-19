import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/schemas/schemas";
import { prisma } from "@/lib/prisma";
import { DataError, NoDataError } from "@/utils/errors";

export async function GET(req: Request) {
  const users = await prisma.user.findMany();

  try {
    if (users.length === 0) {
      throw new NoDataError("No hay usuarios");
    }

    return NextResponse.json({ data: { users } }, { status: 200 });
  } catch (error) {
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
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body: { userName: string; email: string; password: string } =
    await req.json();

  try {
    userSchema.parse(body);

    const userFound = await prisma.user.count({
      where: {
        email: body.email,
      },
    });

    if (userFound > 0) throw new DataError("Usuario ya registrado");

    const newUser = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json({ data: { user: newUser } }, { status: 200 });
  } catch (error) {
    var getClassOf = Function.prototype.call.bind(Object.prototype.toString);

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
          errors: [
            {
              message: "Internal server error",
            },
          ],
        },
      },
      { status: 500 }
    );
  }
}
