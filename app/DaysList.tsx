import { Day } from "@prisma/client"
import getUserDays from "./api/day/getUserDays"
import DayBox from "./DayBox"

const DaysList = async () => {
  const days = await getUserDays()
  return (
    <div className="h-full w-full overflow-y-auto flex flex-col items-center gap-4">
      {days?.map((day: Day) => (
        <DayBox key={day.id} day={day} />
      ))}
    </div>
  )
}

export default DaysList
