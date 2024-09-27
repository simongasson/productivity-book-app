import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TaskItemProps {
  title: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({ title }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    padding: 15,
  },
  taskText: {
    fontSize: 16,
  },
});
