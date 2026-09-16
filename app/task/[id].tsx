import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../_layout";

export default function TaskDetails() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { tasks, toggleTaskStatus } = useTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return <SafeAreaView style={styles.safeArea} edges={["bottom"]}><View style={styles.notFound}><View style={styles.largeIcon}><Ionicons name="document-outline" size={32} color="#3F5BF6" /></View><Text style={styles.notFoundTitle}>Task not found</Text><Text style={styles.notFoundText}>This task may no longer be available.</Text><Pressable style={styles.primaryButton} onPress={() => router.replace("/tasks")}><Text style={styles.primaryButtonText}>Back to tasks</Text></Pressable></View></SafeAreaView>;
  }

  const completed = task.status === "Completed";
  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.statusPill, completed ? styles.completedPill : styles.pendingPill]}><View style={[styles.dot, completed ? styles.completedDot : styles.pendingDot]} /><Text style={[styles.statusText, completed ? styles.completedText : styles.pendingText]}>{task.status}</Text></View>
        <Text style={styles.title}>{task.title}</Text><Text style={styles.description}>{task.description}</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}><View style={styles.infoIcon}><Ionicons name="school-outline" size={20} color="#3F5BF6" /></View><View><Text style={styles.label}>Subject</Text><Text style={styles.value}>{task.subject}</Text></View></View>
          <View style={styles.divider} />
          <View style={styles.infoRow}><View style={styles.infoIcon}><Ionicons name="calendar-outline" size={20} color="#3F5BF6" /></View><View><Text style={styles.label}>Due date</Text><Text style={styles.value}>{task.dueDate}</Text></View></View>
        </View>
        <Pressable accessibilityRole="button" onPress={() => toggleTaskStatus(task.id)} style={({ pressed }) => [styles.primaryButton, completed && styles.secondaryButton, pressed && styles.buttonPressed]}>
          <Ionicons name={completed ? "arrow-undo-outline" : "checkmark-circle-outline"} size={20} color={completed ? "#3F5BF6" : "#FFFFFF"} />
          <Text style={[styles.primaryButtonText, completed && styles.secondaryButtonText]}>{completed ? "Mark as pending" : "Mark as complete"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB"
  }, container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32
  },
  statusPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20
  },
  completedPill: {
    backgroundColor: "#E7F7F1"
  },
  pendingPill: {
    backgroundColor: "#FFF3E2"
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4
  },
  completedDot: {
    backgroundColor: "#28A879"
  },
  pendingDot: {
    backgroundColor: "#F1A33C"
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700"
  },
  completedText: {
    color: "#16825E"
  }, pendingText: {
    color: "#B86C0D"
  },
  title: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "800",
    color: "#17233C",
    marginTop: 18
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#747D90",
    marginTop: 10
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ECEEF",
    padding: 18,
    marginTop: 26,
    marginBottom: 20
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontSize: 12,
    color: "#8A93A6",
    marginBottom: 3
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#17233C"
  },
  divider: {
    height: 1,
    backgroundColor: "#ECEEF3",
    marginVertical: 16
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: "#3F5BF6",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C9D0FF"
  },
  secondaryButtonText: {
    color: "#3F5BF6"
  },
  buttonPressed: {
    opacity: 0.8
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28
  },
  largeIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#E8EBFF",
    alignItems: "center",
    justifyContent: "center"
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#17233C",
    marginTop: 18
  },
  notFoundText: {
    color: "#747D90",
    marginTop: 7,
    marginBottom: 22
  }
});
