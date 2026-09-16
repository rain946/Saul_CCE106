import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import TaskCard from "../../components/TaskCard";

export default function Tasks() {
  const [filter, setFilter] = useState("All");

  const tasks = [
    {
      id: "1",
      title: "React Native Activity",
      subject: "CCE106",
      dueDate: "September 18, 2026",
      status: "Pending",
    },
    {
      id: "2",
      title: "Database Assignment",
      subject: "Information Management",
      dueDate: "September 20, 2026",
      status: "Completed",
    },
    {
      id: "3",
      title: "Networking Quiz",
      subject: "Networking",
      dueDate: "September 22, 2026",
      status: "Pending",
    },
    {
      id: "4",
      title: "Research Paper",
      subject: "Capstone",
      dueDate: "September 25, 2026",
      status: "Pending",
    },
    {
      id: "5",
      title: "UI Design",
      subject: "HCI",
      dueDate: "September 27, 2026",
      status: "Completed",
    },
  ];

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            filter === "All" && styles.activeButton,
          ]}
          onPress={() => setFilter("All")}
        >
          <Text style={styles.filterText}>All</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "Pending" && styles.activeButton,
          ]}
          onPress={() => setFilter("Pending")}
        >
          <Text style={styles.filterText}>Pending</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "Completed" && styles.activeButton,
          ]}
          onPress={() => setFilter("Completed")}
        >
          <Text style={styles.filterText}>Completed</Text>
        </Pressable>
      </View>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          subject={task.subject}
          dueDate={task.dueDate}
          status={task.status}
          onPress={() => router.push(`/task/${task.id}`)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 20,
  },

  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    backgroundColor: "#d9e2ec",
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#1e3a5f",
  },

  filterText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
