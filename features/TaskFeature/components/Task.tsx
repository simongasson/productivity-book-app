import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  isCompleted,
  onToggleComplete,
  onDelete,
  disabled = false,
}) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[
          styles.taskItem,
          isCompleted ? styles.completed : styles.incomplete,
          disabled && styles.disabledTaskItem,
        ]}
        onPress={() => !disabled && onToggleComplete(id)}
        disabled={disabled}
      >
        <Text style={styles.taskText}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => !disabled && onDelete(id)}
        style={[styles.deleteButton, disabled && styles.disabledTaskItem]}
      >
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
  },
  taskItem: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  completed: {
    backgroundColor: "#54efb7",
  },
  incomplete: {
    backgroundColor: "#e0e0e0",
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
  disabledTaskItem: {
    opacity: 0.2,
  },
});
