"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import checkTask from "@/app/api/task/checkTask";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FullTaskType } from "@/types";
import classNames from "classnames";

const emoji = {
  STRENGTH: "💪",
  ENDURANCE: "🏃‍♂️",
  INTELLIGENCE: "🧠",
  AGILITY: "🤸‍♂️",
  DISCIPLINE: "📏",
};

const TaskItem = ({ task }: { task: FullTaskType }) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleCheckboxClick = async () => {
    await checkTask(task);
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <Accordion type="single" collapsible className="flex items-center w-full">
        <AccordionItem value={task.title} className="w-full">
          <div className="flex items-center gap-4 w-full ml-4">
            <Checkbox checked={isCompleted} onClick={handleCheckboxClick} />
            <AccordionTrigger
              className={classNames("w-[70%]", {
                "line-through text-gray-500": isCompleted,
              })}
            >
              {task.title}
            </AccordionTrigger>
          </div>
          <AccordionContent className="ml-8">
            <div>{task.description}</div>
            <div className="mt-4">
              {task.stats.map((stat) => (
                <div key={stat.id} className="flex items-center gap-2">
                  <span>{emoji[stat.type]}</span>
                  <span>{stat.type}</span>
                  <span>({stat.count})</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaskItem;
