import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyFlow</Text>
      <Text style={styles.welcome}>Welcome, Rainier!</Text>

      <Text style={styles.sectionTitle}>Task Summary</Text>

      <View style={styles.statsContainer}>
        <StatCard title="Total Tasks" value={5} />
        <StatCard title="Completed" value={2} />
        <StatCard title="Pending" value={3} />
      </View>

      <Link href="/tasks" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>View Tasks</Text>
        </Pressable>
      </Link>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginTop: 20,
  },

  welcome: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  statsContainer: {
    flexDirection: "row",
    marginBottom: 30,
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
});
