"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PrismaClient, EnumStatType } from '@prisma/client';
import openai from '@/lib/openai';

const prisma = new PrismaClient();

export default async function createTask(title: string, description: string, dayId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return null;
        }

        // Создание задачи
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: session.user.id,
                dayId,
                isCompleted: false
            },
        });

        // Формирование запроса к ChatGPT
        const prompt = `Task: ${title}\nDescription: ${description}\nCalculate the stat changes in the format {"STRENGTH": X, "ENDURANCE": Y, "INTELLIGENCE": Z, "AGILITY": W, "DISCIPLINE": V} where X, Y, Z, W, V are the numbers. Do not use +, just type like {"STRENGTH: 2"} and others`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 50,
        });

        const messageContent = response.choices[0].message?.content;

        console.log(messageContent)

        if (!messageContent) {
            throw new Error("Received null or undefined content from OpenAI");
        }

        // Очистка и парсинг JSON ответа
        const cleanedContent = messageContent.replace(/([a-zA-Z]+):\s*\+?(\d+)/g, '"$1": $2');
        const stats = JSON.parse(cleanedContent.trim());

        // Сохранение характеристик задачи
        const statPromises = Object.entries(stats).map(([type, count]) => {
            let enumType: EnumStatType;
            switch (type.toUpperCase()) {
                case "STRENGTH":
                    enumType = EnumStatType.STRENGHT;
                    break;
                case "ENDURANCE":
                    enumType = EnumStatType.ENDURANCE;
                    break;
                case "INTELLIGENCE":
                    enumType = EnumStatType.INTELLIGENCE;
                    break;
                case "AGILITY":
                    enumType = EnumStatType.AGILITY;
                    break;
                case "DISCIPLINE":
                    enumType = EnumStatType.DISCIPLINE;
                    break;
                default:
                    throw new Error(`Unknown stat type: ${type}`);
            }

            return prisma.stat.create({
                data: {
                    type: enumType,
                    count: parseInt(count as string, 10),
                    taskId: task.id,
                },
            });
        });

        await Promise.all(statPromises);


        return { task, stats };

    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}