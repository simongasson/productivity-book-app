import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "@/constants/Config";

const createTaskItem = async (data: CreateTaskItemCommand) => {
  const response = await axios.post<string>(`${API_URL}/tasks`, data);
  return response.data;
};

export const useCreateTaskItem = (
  taskCreatedSuccessCallback: (
    id: string,
    data: CreateTaskItemCommand
  ) => void = () => {}
) => {
  const [data, setData] = useState<CreateTaskItemCommand>({ title: "" });
  const [inProgress, setInProgress] = useState<CreateTaskItemCommand[]>([]);

  const handleChange = (name: keyof CreateTaskItemCommand, value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (data: CreateTaskItemCommand) => {
    if (data.title.trim().length === 0) {
      Alert.alert("Error", "Please enter a valid task.");
      return;
    }

    setData({ title: "" });

    setInProgress((inProgress) => [...inProgress, data]);
    try {
      const response = await createTaskItem(data);
      taskCreatedSuccessCallback(response, data);
    } catch {
      Alert.alert("Error", "An error occurred while creating the task.");
    } finally {
      setInProgress((inProgress) => {
        const index = inProgress.findIndex((task) => task.title === data.title);
        return inProgress.filter((_, i) => i !== index);
      });
    }
  };

  return { data, handleChange, handleSubmit, inProgress };
};

export interface CreateTaskItemCommand {
  title: string;
}
