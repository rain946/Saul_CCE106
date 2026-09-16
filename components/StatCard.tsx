import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },

  value: {
    fontSize: 24,
    fontWeight: "bold",
  },

  title: {
    fontSize: 14,
    marginTop: 5,
  },
});
