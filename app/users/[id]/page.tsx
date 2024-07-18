import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";
import TasksOverTime from "./TasksOverTime";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const calculateLevel = (exp: number) => {
  let level = 1;
  let expNeeded = 220;
  while (exp >= expNeeded) {
    level++;
    exp -= expNeeded;
    expNeeded = Math.floor(expNeeded * 1.1);
  }
  return { level, remainingExp: exp, expNeeded };
};

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  const { level, remainingExp, expNeeded } = calculateLevel(user.exp);
  const progressPercentage = (remainingExp / expNeeded) * 100;

  return (
    <div className="ml-[17%] mt-8">
      <div className="flex gap-24 h-[400px]">
        <Card className="bg-zinc-100 w-[350px] h-[375px]">
          <CardHeader>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Avatar className="w-[140px] h-[140px]">
              <AvatarImage src={user.image!} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <p>Current Level: {level}</p>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-6 mt-4">
              <div
                className="bg-primary/40 h-6 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {remainingExp} / {expNeeded} XP to next level
            </p>
          </CardContent>
        </Card>
        <TasksOverTime userId={user.id} />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <ul className="list-disc list-inside mt-2">
          <li>💪Strength: {user.strength}</li>
          <li>🏃Endurance: {user.endurance}</li>
          <li>🧠Intelligence: {user.intelligence}</li>
          <li>🤸Agility: {user.agility}</li>
          <li>📏Discipline: {user.discipline}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
