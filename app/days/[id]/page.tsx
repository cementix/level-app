import getDayById from "@/app/api/day/getDayById"
import { ClipLoader } from "react-spinners"
import TaskManager from "./TaskManager"


const page = async ({params}: {params: {id: string}}) => {
    const {id} = params
    const day = await getDayById(id)
  return (
    <main className="ml-[15%]">
      {day ? <TaskManager tasks={day.tasks} /> : <ClipLoader /> }
    </main>
  )
}

export default page
