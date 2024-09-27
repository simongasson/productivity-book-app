import { API_URL } from "@/constants/Config";
import axios from "axios";
import { useEffect, useState } from "react";

const getTaskGroups = async () => {
  const response = await axios.get<TaskGroupDto[]>(`${API_URL}/task-groups`);
  return response.data;
};

export const useGetTaskGroups = () => {
  const [taskGroups, setTaskGroups] = useState<TaskGroupDto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await getTaskGroups();
      setTaskGroups(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { taskGroups, loading, fetchData };
};

export interface TaskGroupDto {
  id: string;
  date: Date;
  tasks: TaskItemDto[];
  isActive: boolean;
}

export interface TaskItemDto {
  id: string;
  title: string;
  isCompleted: boolean;
}
