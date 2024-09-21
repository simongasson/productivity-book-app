import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Task } from "./Task";
import { ITask } from "../taskService";

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onToggle,
  onDelete,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            id={item.id}
            title={item.title}
            isCompleted={item.isCompleted}
            onToggleComplete={onToggle}
            onDelete={onDelete}
            disabled={item.isDisabled}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
