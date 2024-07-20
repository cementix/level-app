'use server'

import { checkServerSession } from "@/lib/checkServerSession"
import prisma from "@/lib/db"

export default async function createDay(title: string) {
    try {
        const session = await checkServerSession()

        const newDay = await prisma.day.create({
            data: {
                title,
                userId: session.user.id
            },
            include: {
                user: true
            }
        })

        return newDay
    } catch (error: any) {
        console.log(error.message)   
    }
}