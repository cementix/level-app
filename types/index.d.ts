import { Stat, Task } from "@prisma/client";

type FullTaskType = Task & {
  stats: Stat[];
};
