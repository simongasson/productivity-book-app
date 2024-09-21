import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, Alert } from "react-native";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = async () => {
    if (task.trim().length === 0) {
      Alert.alert("Error", "Please enter a valid task.");
      return;
    }
    onAddTask(task);
    setTask("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        placeholderTextColor="#888"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    fontSize: 16,
  },
});
