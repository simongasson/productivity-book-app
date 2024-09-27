import React, { ReactNode } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

interface UpdateTaskCompletionStatusButtonPros {
  children: ReactNode;
  isCompleted: boolean;
  onUpdate: () => void;
  style?: ViewStyle;
}

export const UpdateTaskCompletionStatusButton: React.FC<
  UpdateTaskCompletionStatusButtonPros
> = ({ children, isCompleted, onUpdate, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isCompleted ? styles.completed : styles.incomplete,
        style,
      ]}
      onPress={onUpdate}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  completed: {
    backgroundColor: "#54efb7",
  },
  incomplete: {
    backgroundColor: "#e0e0e0",
  },
});
