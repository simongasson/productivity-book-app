import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { CreateTaskItemCommand } from "./useCreateTaskItem";

export interface CreateTaskItemInputProps {
  onChange: (name: keyof CreateTaskItemCommand, value: string) => void;
  onSubmit: (data: CreateTaskItemCommand) => void;
  data: CreateTaskItemCommand;
}

export const CreateTaskItemInput: React.FC<CreateTaskItemInputProps> = ({
  onChange,
  onSubmit,
  data,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        placeholderTextColor="#888"
        value={data.title}
        onChangeText={(text) => onChange("title", text)}
      />
      <Button title="Add" onPress={() => onSubmit(data)} />
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
