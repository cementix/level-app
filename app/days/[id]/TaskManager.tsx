import CreateTaskButton from "./CreateTaskButton";
import TaskItem from "./TaskItem";
import { FullTaskType } from "@/types";

const TaskManager = async ({ tasks }: { tasks: FullTaskType[] }) => {
  return (
    <div className="w-[500px] bg-slate-100 rounded-xl flex items-center justify-center flex-col">
      <CreateTaskButton />
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default TaskManager;
