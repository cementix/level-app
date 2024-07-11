import { Day } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const DayBox = ({ day }: { day: Day }) => {
  return (
    <Link href={`/days/${day.id}`}>
    <Card className="h-12 w-48 flex text-xs items-center">
      <CardHeader>
        <CardTitle>
          {day.title}
        </CardTitle>
      </CardHeader>
    </Card>
    </Link>
  );
};

export default DayBox;
