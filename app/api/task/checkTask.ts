"use server"

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function checkTask(task: Task) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            throw new Error('Unauthorized');
        }

        const foundTask = await prisma.task.findUnique({
            where: {
                id: task.id
            }
        })
        if (!foundTask) {
            throw new Error('Task not found');
        }

        const checkedTask = await prisma.task.update({
            where: {
                id: task.id
            },
            data: {
                isCompleted: !foundTask.isCompleted
            },
            include: {
                stats: true
            }
        })

        if (checkedTask.isCompleted) {
            const user = await prisma.user.findUnique({
                where: {
                    id: foundTask.userId
                }
            });
            
            if (!user) {
                throw new Error('User not found');
            }
            
            for (const stat of checkedTask.stats) {
                const statType = stat.type.toLowerCase();
                await prisma.user.update({
                    where: { id: checkedTask.userId },
                    data: {
                        [statType]: {
                            increment: stat.count
                        }
                    }
                });
            }
        } else {
            for (const stat of checkedTask.stats) {
                await prisma.user.update({
                    where: { id: checkedTask.userId },
                    data: {
                        [stat.type.toLowerCase()]: {
                            decrement: stat.count
                        }
                    }
                });
            }
        }
    } catch (error: any) {
        console.log(error.message)
    }
}
