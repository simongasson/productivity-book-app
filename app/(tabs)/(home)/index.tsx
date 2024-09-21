import TaskInput from "@/features/TaskFeature/components/TaskInput";
import TaskList from "@/features/TaskFeature/components/TaskList";
import { useTasks } from "@/features/TaskFeature/hooks/useTasks";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const tasks = useTasks();

  return (
    <View style={styles.container}>
      <TaskInput onAddTask={tasks.add} onTaskAdded={tasks.fetch} />
      <TaskList {...tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    fontSize: 16,
  },
});
