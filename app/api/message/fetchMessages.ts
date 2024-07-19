"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function fetchMessages() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }

    let conversation = await prisma.conversation.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversation.id,
      },
    });

    return messages
  } catch (error: any) {
    throw new Error(error.message);
  }
}
