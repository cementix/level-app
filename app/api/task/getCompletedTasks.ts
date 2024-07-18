"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function getCompletedTasks(userId: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            throw new Error('Unauthorized')
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
                isCompleted: true
            },
            select: {
                createdAt: true
            }
        })
        
        return tasks

    } catch (error: any) {
        throw new Error(error.message)
    }
}