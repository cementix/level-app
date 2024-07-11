"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function getDayById(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    const day = await prisma.day.findUnique({
      where: {
        userId: session.user.id,
        id,
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
