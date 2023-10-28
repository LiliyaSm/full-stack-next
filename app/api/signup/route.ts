import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { IsNotEmpty, IsEmail } from 'class-validator';

// export class CreateUserDTO {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   fullName: string;
// }

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        email: user?.email,
      },
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message:
              "Email should be unique",
          }),
          { status: 400 }
        );
      }
    }
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: e.message,
      }),
      { status: 500 }
    );
  }
}
