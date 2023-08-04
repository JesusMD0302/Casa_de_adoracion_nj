import { emailSchema } from "@/schemas/schemas";
import { mailOptions, transporter } from "@/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, name, subject, message } = emailSchema.parse(body);

    await transporter.sendMail({
      ...mailOptions,
      subject: `${subject} - ${name}`,
      html: `<h1>${name}</h1><a href="mailto:${email}">${email}</a><p>${message}</p>`,
    });

    return NextResponse.json({ data: { success: true } }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          data: {
            errors: error.issues.map((issue) => ({
              message: issue.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    console.log(error);

    return NextResponse.json(
      {
        data: { message: "Internal server error" },
      },
      { status: 500 }
    );
  }
}
