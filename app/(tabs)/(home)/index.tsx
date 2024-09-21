import { TaskInput } from "@/features/TaskFeature/components/TaskInput";
import { TaskList } from "@/features/TaskFeature/components/TaskList";
import { useTasksController } from "@/features/TaskFeature/hooks/useTasksController";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
  const tasksController = useTasksController();

  return (
    <View style={styles.container}>
      <TaskInput onAddTask={tasksController.add} />
      <TaskList
        tasks={tasksController.tasks}
        loading={tasksController.loading}
        onToggle={tasksController.toggleTask}
        onDelete={tasksController.removeTask}
      />
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
