import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type StatCardProps = { title: string; value: number; color?: string; icon?: keyof typeof Ionicons.glyphMap };

export default function StatCard({ title, value, color = "#3F5BF6", icon = "layers-outline" }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${color}18` }]}><Ionicons name={icon} size={18} color={color} /></View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 96,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ECEEF3"
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  value: {
    fontSize: 25,
    lineHeight: 29,
    fontWeight: "800",
    color: "#17233C"
  },
  title: {
    fontSize: 12,
    color: "#747D90",
    marginTop: 3,
    fontWeight: "500"
  },
});
