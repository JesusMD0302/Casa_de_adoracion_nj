import { NextRequest } from "next/server";
import { UnauthorizedError } from "@/utils/errors";

export function ValidateAuthorization(req: NextRequest) {
  if (!req.cookies.get("token")) {
    throw new UnauthorizedError(
      "Acceso no autorizado, es necesario un token de autenticación"
    );
  }
}
