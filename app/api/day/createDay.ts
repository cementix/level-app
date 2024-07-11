'use server'

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"

export default async function createDay(title: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return null
        }

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