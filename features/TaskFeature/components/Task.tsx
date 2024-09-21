import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TaskProps {
  title: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isCompleted ? styles.completed : styles.incomplete,
      ]}
      onPress={onToggleComplete}
    >
      <Text style={styles.taskText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  completed: {
    backgroundColor: "#d1ffd1",
  },
  incomplete: {
    backgroundColor: "#e0e0e0",
  },
  taskText: {
    fontSize: 16,
  },
});

export default Task;
