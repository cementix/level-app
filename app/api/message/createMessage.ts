"use server"

import { checkServerSession } from "@/lib/checkServerSession"
import prisma from "@/lib/db"

export default async function createMessage(body: string) {
    try {
        const session = await checkServerSession()

        const conversation = await prisma.conversation.findFirst({
            where: {
                userId: session.user.id
            }
        })
        if (!conversation) {
            throw new Error("No conversation")
        }

        const newMessage = await prisma.message.create({
            data: {
                body,
                conversationId: conversation.id,
                type: "USER"
            }
        })
        
        return newMessage
    } catch (error: any) {
        throw new Error(error.message)
    }
}