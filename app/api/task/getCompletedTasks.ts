"use server"

import { checkServerSession } from "@/lib/checkServerSession"
import prisma from "@/lib/db"

export default async function getCompletedTasks(userId: string) {
    try {
        const session = await checkServerSession()

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