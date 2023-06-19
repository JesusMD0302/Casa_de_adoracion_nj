import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DataError } from "@/utils/errors";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const requestUserID = params.userID;
  const userID = Number(requestUserID);

  try {
    if (isNaN(userID) || userID < 1) {
      throw new DataError("El id no existe");
    }

    const user = await prisma.user.findUnique({ where: { userID: userID } });

    if (user == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { user: user } }, { status: 200 });
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

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const requestUserID = params.userID;

  const userID = Number(requestUserID);

  try {
    if (isNaN(userID) || userID == 0) {
      throw new DataError("El id no existe");
    }

    const body: { userName: string; email: string; password: string } =
      await req.json();

    const userFound = await prisma.user.count({
      where: {
        email: body.email,
        AND: {
          userID: {
            not: userID,
          },
        },
      },
    });

    if (userFound > 0) throw new DataError("Usuario ya registrado");

    const user = await prisma.user.update({
      where: { userID: userID },
      data: {
        userName: body.userName,
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json({ data: { user: user } }, { status: 200 });
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

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const requestUserID = params.userID;

  const userID = Number(requestUserID);

  try {
    if (isNaN(userID) || userID == 0) {
      throw new DataError("El id no existe");
    }

    if (userID === 1) {
      throw new Error("El usuario no se puede eliminar");
    }

    const res = await prisma.user.delete({
      where: {
        userID: userID,
      },
    });

    return NextResponse.json({ elementDeleted: res }, { status: 200 });
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

    return NextResponse.json(
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
