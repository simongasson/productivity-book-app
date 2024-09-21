import axios from "axios";

const API_URL = `https://d2c3-105-246-80-226.ngrok-free.app/api/task`;

export interface TaskType {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const getTask = async (id: number): Promise<TaskType> => {
  const response = await axios.get<TaskType>(`${API_URL}/${id}`);
  return response.data;
};

export const getTasks = async (): Promise<TaskType[]> => {
  const response = await axios.get<TaskType[]>(API_URL);
  return response.data;
};

export const createTask = async (title: string): Promise<TaskType> => {
  const response = await axios.post<TaskType>(API_URL, { title });
  return response.data;
};
