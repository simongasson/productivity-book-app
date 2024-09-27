import axios from "axios";
import { API_URL } from "@/constants/Config";

const deleteTaskItem = async (id: string) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export const useDeleteTaskItem = (
  taskDeletedCallback: (id: string) => void = () => {}
) => {
  const handleDelete = async (id: string) => {
    await deleteTaskItem(id);
    taskDeletedCallback(id);
  };

  return { handleDelete };
};

export interface DeleteTaskItemCommand {
  id: string;
}
