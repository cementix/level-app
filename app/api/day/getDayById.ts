"use server";

import { checkServerSession } from "@/lib/checkServerSession";
import prisma from "@/lib/db";

export default async function getDayById(id: string) {
  try {
    const session = await checkServerSession()

    const day = await prisma.day.findUnique({
      where: {
        userId: session.user.id,
        id,
      },
      include: {
        tasks: {
          include: {
            stats: true,
          },
        },
      },
    });

    if (day) {
      return day;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
