import React from "react";
import { TaskType } from "../taskService";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Task from "./Task";

export interface TaskListProps {
  tasks: TaskType[];
  onToggle: (id: number) => void;
  loading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, loading }) => {
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            isCompleted={item.isCompleted}
            onToggleComplete={() => onToggle(item.id)}
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

export default TaskList;
