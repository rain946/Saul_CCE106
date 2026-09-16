import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import TaskCard from "../../components/TaskCard";
import { TaskStatus, useTasks } from "../_layout";

type Filter = "All" | TaskStatus;
const filters: Filter[] = ["All", "Pending", "Completed"];

export default function Tasks() {
  const [filter, setFilter] = useState<Filter>("All");
  const { tasks } = useTasks();
  const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<>
          <Text style={styles.eyebrow}>YOUR WORK</Text>
          <Text style={styles.title}>My tasks</Text>
          <Text style={styles.subtitle}>{tasks.filter((task) => task.status === "Pending").length} tasks still need your attention.</Text>
          <View style={styles.filterContainer}>
            {filters.map((item) => {
              const active = filter === item;
              return <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filterButton, active && styles.activeButton]}><Text style={[styles.filterText, active && styles.activeText]}>{item}</Text></Pressable>;
            })}
          </View>
        </>}
        renderItem={({ item }) => <TaskCard {...item} onPress={() => router.push({ pathname: "/task/[id]", params: { id: item.id } })} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Nothing here</Text><Text style={styles.emptyText}>No tasks match this filter.</Text></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F6F7FB" }, list: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  eyebrow: { fontSize: 11, letterSpacing: 1.6, fontWeight: "800", color: "#3F5BF6" }, title: { fontSize: 28, lineHeight: 34, fontWeight: "800", color: "#17233C", marginTop: 4 },
  subtitle: { fontSize: 14, color: "#747D90", marginTop: 5 }, filterContainer: { flexDirection: "row", padding: 4, marginTop: 22, marginBottom: 20, borderRadius: 15, backgroundColor: "#EAECF2" },
  filterButton: { flex: 1, minHeight: 39, borderRadius: 12, alignItems: "center", justifyContent: "center" }, activeButton: { backgroundColor: "#FFFFFF" },
  filterText: { fontSize: 13, fontWeight: "600", color: "#747D90" }, activeText: { color: "#3F5BF6", fontWeight: "800" },
  empty: { alignItems: "center", paddingVertical: 60 }, emptyTitle: { fontSize: 18, fontWeight: "700", color: "#17233C" }, emptyText: { color: "#747D90", marginTop: 6 },
});
