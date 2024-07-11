"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function getUserDays() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

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
