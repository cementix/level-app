"use server"

import { checkServerSession } from "@/lib/checkServerSession";
import prisma from "@/lib/db";
import { Task } from "@prisma/client";

function calculateLevel(exp: number) {
  let level = 1;
  let expNeeded = 200;
  while (exp >= expNeeded) {
    level++;
    exp -= expNeeded;
    expNeeded = Math.floor(expNeeded * 1.1);
  }
  return { level, remainingExp: exp };
}

export default async function checkTask(task: Task) {
  try {
    const session = await checkServerSession()

    const foundTask = await prisma.task.findUnique({
      where: { id: task.id }
    })
    if (!foundTask) {
      throw new Error('Task not found');
    }

    const checkedTask = await prisma.task.update({
      where: { id: task.id },
      data: { isCompleted: !foundTask.isCompleted },
      include: { stats: true }
    })

    const user = await prisma.user.findUnique({
      where: { id: foundTask.userId }
    });
    if (!user) {
      throw new Error('User not found');
    }

    if (checkedTask.isCompleted) {
      let totalExpGain = 0;
      for (const stat of checkedTask.stats) {
        const statType = stat.type.toLowerCase();
        totalExpGain += stat.count;
        await prisma.user.update({
          where: { id: checkedTask.userId },
          data: {
            [statType]: {
              increment: stat.count
            },
            exp: { increment: stat.count }
          }
        });
      }

      const updatedUser = await prisma.user.findUnique({
        where: { id: foundTask.userId }
      });

      if (updatedUser) {
        const { level, remainingExp } = calculateLevel(updatedUser.exp);
        await prisma.user.update({
          where: { id: updatedUser.id },
          data: {
            level: level,
            exp: remainingExp
          }
        });
      }

    } else {
      let totalExpLoss = 0;
      for (const stat of checkedTask.stats) {
        totalExpLoss += stat.count;
        await prisma.user.update({
          where: { id: checkedTask.userId },
          data: {
            [stat.type.toLowerCase()]: {
              decrement: stat.count
            },
            exp: { decrement: stat.count }
          }
        });
      }

      const updatedUser = await prisma.user.findUnique({
        where: { id: foundTask.userId }
      });

      if (updatedUser) {
        const { level, remainingExp } = calculateLevel(updatedUser.exp);
        await prisma.user.update({
          where: { id: updatedUser.id },
          data: {
            level: level,
            exp: remainingExp
          }
        });
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
