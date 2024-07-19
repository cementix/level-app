"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function createMessage(body: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            throw new Error('Unauthorized')
        }

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