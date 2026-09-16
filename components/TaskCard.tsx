import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskCardProps = {
  title: string;
  subject: string;
  dueDate: string;
  status: string;
  onPress: () => void;
};

export default function TaskCard({
  title,
  subject,
  dueDate,
  status,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.date}>Due: {dueDate}</Text>

        <Text
          style={[
            styles.status,
            status === "Completed"
              ? styles.completed
              : styles.pending,
          ]}
        >
          {status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.6,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a5f",
  },

  subject: {
    fontSize: 15,
    marginTop: 5,
  },

  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  status: {
    marginTop: 10,
    fontWeight: "bold",
  },

  completed: {
    color: "green",
  },

  pending: {
    color: "orange",
  },
});
