import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, ITask } from "../taskService";

export interface TasksController {
  tasks: ITask[];
  fetch: () => void;
  add: (task: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  loading: boolean;
}

export const useTasksController = (): TasksController => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks.toReversed());
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const add = async (task: string) => {
    setTasks((prevTasks) => [
      {
        id: (tasks.length + 1).toString(),
        title: task,
        isCompleted: false,
        isDisabled: true,
      },
      ...prevTasks,
    ]);
    await createTask(task);
    fetch();
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const removeTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    await deleteTask(id);
  };

  return { tasks, fetch, add, removeTask, toggleTask, loading };
};
