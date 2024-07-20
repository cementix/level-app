"use server";

import { checkServerSession } from "@/lib/checkServerSession";
import prisma from "@/lib/db";

export default async function getUserDays() {
  try {
    const session = await checkServerSession()

    const days = await prisma.day.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return days;
  } catch (error: any) {
    console.log(error.message);
  }
}
