import { NextRequest } from "next/server";
import { UnauthorizedError } from "@/utils/errors";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function ValidateAuthorization(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });

  if (!(token as any)?.user.accessToken) {
    throw new UnauthorizedError(
      "Acceso no autorizado, es necesario un token de autenticación"
    );
  }

  if (
    !jwt.verify((token as any)?.user.accessToken, process.env.SECRET_KEY ?? "")
  ) {
    throw new UnauthorizedError(
      "Acceso no autorizado, es necesario un token de autenticación"
    );
  }
}
