"use server";

import { checkServerSession } from "@/lib/checkServerSession";
import prisma from "@/lib/db";

export default async function fetchMessages() {
  try {
    const session = await checkServerSession()

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
