import { Task } from "@prisma/client"
import CreateTaskButton from "./CreateTaskButton"

const TaskManager = ({tasks}: {tasks: Task[]}) => {
  return (
    <div>
      <CreateTaskButton />
    </div>
  )
}

export default TaskManager
