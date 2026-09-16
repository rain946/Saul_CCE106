import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatCard from "../../components/StatCard";
import TaskCard from "../../components/TaskCard";
import { useTasks } from "../_layout";

export default function Dashboard() {
  const { tasks } = useTasks();
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const pending = tasks.length - completed;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={styles.eyebrow}>STUDYFLOW</Text><Text style={styles.title}>Good day, Rainier 👋</Text></View>
          <View style={styles.avatar}><Text style={styles.avatarText}>RS</Text></View>
        </View>
        <Text style={styles.subtitle}>Stay focused. You have {pending} {pending === 1 ? "task" : "tasks"} left to finish.</Text>

        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsContainer}>
          <StatCard title="All tasks" value={tasks.length} icon="layers-outline" />
          <StatCard title="Completed" value={completed} color="#28A879" icon="checkmark-outline" />
          <StatCard title="Pending" value={pending} color="#F1A33C" icon="time-outline" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Up next</Text>
          <Link href="/tasks" asChild><Pressable hitSlop={10}><Text style={styles.link}>See all</Text></Pressable></Link>
        </View>
        {tasks.filter((task) => task.status === "Pending").slice(0, 2).map((task) => (
          <TaskCard key={task.id} {...task} onPress={() => router.push({ pathname: "/task/[id]", params: { id: task.id } })} />
        ))}

        <Link href="/tasks" asChild>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonText}>View all tasks</Text><Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB"
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: "800",
    color: "#3F5BF6"
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "800",
    color: "#17233C",
    marginTop: 4
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#747D90",
    marginTop: 8,
    marginBottom: 28
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EBFF"
  },
  avatarText: {
    color: "#3F5BF6",
    fontWeight: "800"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#17233C",
    marginBottom: 12
  },
  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  link: {
    color: "#3F5BF6",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12
  },
  button: {
    minHeight: 52,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "#3F5BF6",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
