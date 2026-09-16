
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

export default function TaskDetails() {
  const { id } = useLocalSearchParams();

  const task = tasks.find((item) => item.id === id);

  const [completed, setCompleted] = useState(
    task?.status === "Completed"
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task Not Found</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Subject</Text>
        <Text style={styles.text}>{task.subject}</Text>

        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.text}>{task.dueDate}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.text}>
          {completed ? "Completed" : "Pending"}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => setCompleted(!completed)}
      >
        <Text style={styles.buttonText}>
          {completed ? "Mark as Pending" : "Mark as Complete"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Back</Text>
      </Pressable>
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

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 3,
  },

  button: {
    backgroundColor: "#1e3a5f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  backButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  backText: {
    color: "#1e3a5f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
