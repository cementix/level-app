"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import { useEffect, useState } from "react";
import getCompletedTasks from "@/app/api/task/getCompletedTasks";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const TasksOverTime = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getCompletedTasks(userId);

      const groupedTasks: { [key: string]: number } = {};
      tasks.forEach((task) => {
        const date = task.createdAt.toISOString().split("T")[0];
        if (!groupedTasks[date]) {
          groupedTasks[date] = 0;
        }
        groupedTasks[date]++;
      });

      const labels = Object.keys(groupedTasks);
      const data = {
        labels,
        datasets: [
          {
            label: "Completed Tasks",
            data: labels.map((date) => groupedTasks[date]),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            color: "rgb(255, 159, 64)",
            backgroundColor: "rgb(255, 159, 64)",
            tension: 0.1,
          },
        ],
      };
      setData(data);
    };

    fetchData();
  }, [userId]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "700px", height: "700px" }}>
      <h1 className="font-bold mb-5">Completed Tasks Over Time</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default TasksOverTime;
