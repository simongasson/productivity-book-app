import { useEffect, useState } from "react";
import { getTasks, TaskType } from "../taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const add = (task: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, title: task, isCompleted: false },
    ]);
  };

  useEffect(() => {
    fetch();
  }, []);

  const onToggle = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return { tasks, fetch, add, onToggle, loading };
};
