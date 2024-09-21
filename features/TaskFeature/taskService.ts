import axios from "axios";

const API_URL = `https://f02f-105-242-173-223.ngrok-free.app/api/task`;

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
  isDisabled?: boolean;
}

export const getTask = async (id: string): Promise<ITask> => {
  const response = await axios.get<ITask>(`${API_URL}/${id}`);
  return response.data;
};

export const getTasks = async (): Promise<ITask[]> => {
  const response = await axios.get<ITask[]>(API_URL);
  return response.data;
};

export const createTask = async (title: string): Promise<ITask> => {
  const response = await axios.post<ITask>(API_URL, { title });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
