import React from "react";

import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useCreateTaskItem } from "@/features/createTaskItem/useCreateTaskItem";
import { CreateTaskItemInput } from "@/features/createTaskItem/CreateTaskItemInput";
import { TaskItem } from "@/features/getTaskGroups/TaskItem";
import { useDeleteTaskItem } from "@/features/deleteTaskItem/useDeleteTaskItem";
import { UpdateTaskCompletionStatusButton } from "@/features/updateTaskItemCompletionStatus/UpdateTaskCompletionStatusButton";
import {
  TaskItemDto,
  useGetTaskGroups,
} from "@/features/getTaskGroups/useGetTaskGroups";
import { useUpdateTaskItemCompletionStatus } from "@/features/updateTaskItemCompletionStatus/useUpdateTaskItemCompletionStatus";
import { SwipeToDeleteTaskItem } from "@/features/deleteTaskItem/SwipeToDeleteTaskItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { taskGroups, loading } = useGetTaskGroups();
  const [tasks, setTasks] = useState<TaskItemDto[]>([]);

  const { data, handleChange, handleSubmit, inProgress } = useCreateTaskItem(
    (id, data) => {
      setTasks((tasks) => [
        { id, title: data.title, isCompleted: false },
        ...tasks,
      ]);
    }
  );

  const { handleDelete } = useDeleteTaskItem();
  const removeTask = (id: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const { handleUpdate } = useUpdateTaskItemCompletionStatus();
  const updateTask = (id: string, isCompleted: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, isCompleted } : task))
    );
  };

  useEffect(() => {
    const activeTaskGroup = taskGroups.find((taskGroup) => {
      return taskGroup.isActive;
    });

    if (activeTaskGroup) {
      setTasks(activeTaskGroup.tasks);
    }
  }, [taskGroups]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CreateTaskItemInput
          onChange={handleChange}
          onSubmit={handleSubmit}
          data={data}
        />
        {inProgress && (
          <FlatList
            data={inProgress.reverse()}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <TaskItem title={item.title} />
              </View>
            )}
          />
        )}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SwipeToDeleteTaskItem
                onDelete={() => {
                  removeTask(item.id);
                  handleDelete(item.id);
                }}
              >
                <View style={styles.taskContainer}>
                  <UpdateTaskCompletionStatusButton
                    style={styles.taskItem}
                    isCompleted={item.isCompleted}
                    onUpdate={() => {
                      updateTask(item.id, !item.isCompleted);
                      handleUpdate(item.id, !item.isCompleted);
                    }}
                  >
                    <TaskItem title={item.title} />
                  </UpdateTaskCompletionStatusButton>
                </View>
              </SwipeToDeleteTaskItem>
            )}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  taskItem: {
    borderRadius: 5,
  },
});
