import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TaskStatus } from "../app/_layout";

type TaskCardProps = { title: string; subject: string; dueDate: string; status: TaskStatus; onPress: () => void };

export default function TaskCard({ title, subject, dueDate, status, onPress }: TaskCardProps) {
  const isCompleted = status === "Completed";
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${title}`} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
      <View style={[styles.accent, isCompleted ? styles.completedAccent : styles.pendingAccent]} />
      <View style={styles.content}>
        <View style={styles.headingRow}>
          <View style={styles.headingCopy}><Text style={styles.title} numberOfLines={2}>{title}</Text><Text style={styles.subject}>{subject}</Text></View>
          <Ionicons name="chevron-forward" size={20} color="#A1A8B7" />
        </View>
        <View style={styles.metaRow}>
          <View style={styles.dateRow}><Ionicons name="calendar-outline" size={15} color="#747D90" /><Text style={styles.date}>{dueDate}</Text></View>
          <View style={[styles.badge, isCompleted ? styles.completedBadge : styles.pendingBadge]}><Text style={[styles.badgeText, isCompleted ? styles.completedText : styles.pendingText]}>{status}</Text></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", overflow: "hidden", backgroundColor: "#FFFFFF", borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: "#ECEEF3" },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  accent: { width: 5 }, completedAccent: { backgroundColor: "#28A879" }, pendingAccent: { backgroundColor: "#F1A33C" },
  content: { flex: 1, padding: 16 }, headingRow: { flexDirection: "row", alignItems: "center", gap: 10 }, headingCopy: { flex: 1 },
  title: { fontSize: 16, lineHeight: 21, fontWeight: "700", color: "#17233C" }, subject: { fontSize: 13, color: "#747D90", marginTop: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 14 },
  dateRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 }, date: { flex: 1, fontSize: 12, color: "#747D90" },
  badge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 }, completedBadge: { backgroundColor: "#E7F7F1" }, pendingBadge: { backgroundColor: "#FFF3E2" },
  badgeText: { fontSize: 11, fontWeight: "700" }, completedText: { color: "#16825E" }, pendingText: { color: "#B86C0D" },
});
