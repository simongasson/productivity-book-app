import axios from "axios";
import { Alert } from "react-native";
import { API_URL } from "@/constants/Config";

const updateTaskItemCompletionStatus = async (
  id: string,
  isCompleted: boolean
) => {
  await axios.put(`${API_URL}/tasks/${id}/completion`, { isCompleted });
};

export const useUpdateTaskItemCompletionStatus = (
  taskItemCompletionStatusUpdatedCallback: (
    id: string,
    isCompleted: boolean
  ) => void = () => {}
) => {
  const handleUpdate = async (id: string, isCompleted: boolean) => {
    try {
      await updateTaskItemCompletionStatus(id, isCompleted);
      taskItemCompletionStatusUpdatedCallback(id, isCompleted);
    } catch {
      Alert.alert("Error", "An error occurred while updating the task.");
    }
  };

  return { handleUpdate };
};
