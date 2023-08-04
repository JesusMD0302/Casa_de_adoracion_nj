import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DataError, UnauthorizedError } from "@/utils/errors";
import { ValidateAuthorization } from "@/utils/validateAuthorization";
import { changePasswordSchema, userSchema } from "@/schemas/schemas";
import { ZodError } from "zod";
import { encryptPassword } from "@/utils/bcrypt";

export async function GET(
  req: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestUserID = params.userID;
    const userID = Number(requestUserID);

    if (isNaN(userID) || userID < 1) {
      throw new DataError("El id no existe");
    }

    const user = await prisma.user.findUnique({ where: { userID: userID } });

    if (user == null) {
      throw new DataError("El id no existe");
    }

    return NextResponse.json({ data: { user: user } }, { status: 200 });
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
  req: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestUserID = params.userID;

    const userID = Number(requestUserID);

    if (isNaN(userID) || userID == 0) {
      throw new DataError("El id no existe");
    }

    const body: { userName: string; email: string; password: string } =
      await req.json();

    userSchema.parse(body);

    const emailFound = await prisma.user.count({
      where: {
        email: body.email,
        AND: {
          userID: {
            not: userID,
          },
        },
      },
    });

    if (emailFound > 0)
      throw new DataError("Ya existe un usuario usando ese correo");

    const userExist = await prisma.user.count({
      where: {
        userID: userID,
      },
    });

    if (userExist <= 0) throw new DataError("Usuario no encontrado");

    const encryptedPassword = await encryptPassword(body.password);

    const user = await prisma.user.update({
      where: { userID: userID },
      data: {
        userName: body.userName,
        email: body.email,
        password: encryptedPassword,
      },
    });

    return NextResponse.json({ data: { user: user } }, { status: 200 });
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
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestUserID = params.userID;

    const userID = Number(requestUserID);

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    ValidateAuthorization(req);

    const requestUserID = params.userID;

    const userID = Number(requestUserID);

    if (isNaN(userID) || userID == 0) {
      throw new DataError("El id no existe");
    }

    const body: { newPassword: string; confirmPassword: string } =
      await req.json();

    const { newPassword } = changePasswordSchema.parse(body);

    const userExist = await prisma.user.count({
      where: {
        userID: userID,
      },
    });

    if (userExist <= 0) throw new DataError("Usuario no encontrado");

    const encryptedPassword = await encryptPassword(newPassword);

    const user = await prisma.user.update({
      where: { userID: userID },
      data: {
        password: encryptedPassword,
      },
    });

    return NextResponse.json({ data: { user: user } }, { status: 200 });
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
      { data: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
