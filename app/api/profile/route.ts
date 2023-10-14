import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({
      name: user.name || "",
      title: user.title || "",
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const { name, title } = await req.json();
  try {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        title,
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      title: user.title,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
