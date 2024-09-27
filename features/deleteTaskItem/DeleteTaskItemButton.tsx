import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface DeleteTaskItemButtonProps {
  onDelete: () => void;
}

export const DeleteTaskItemButton: React.FC<DeleteTaskItemButtonProps> = ({
  onDelete,
}) => {
  return (
    <TouchableOpacity onPress={onDelete} style={[styles.deleteButton]}>
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
  deleteText: {
    color: "#fff",
  },
});
