
import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Status = "Present" | "Absent" | null;

type Student = {
  id: number;
  name: string;
  status: Status;
};

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Rainier Saul", status: null},
    { id: 2, name: "Ay be", status: null},
    { id: 3, name: "Edieson Malintad", status: null},
    { id: 4, name: "Michaela Bagay", status: null},
    { id: 5, name: "Jade Olacao", status: null},
    { id: 6, name: "joyce Jayagan", status: null},
    { id: 7, name: "Mark Catolico", status: null},
    { id: 8, name: "Karl Calizar", status: null},
    { id: 9, name: "Trisha Fucondo", status: null},
    { id: 10, name: "Mike Iroy", status: null},
  ]);

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  // Required useEffect
  useEffect(() => {
    const present = students.filter(
      (student) => student.status === "Present"
    ).length;

    const absent = students.filter(
      (student) => student.status === "Absent"
    ).length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [students]);

  const updateAttendance = (id: number, status: Status) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === status ? null : status,
            }
          : student
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance List</Text>
      <Text style={styles.subtitle}>Lab 08 - Local State and App Logic</Text>

      <View style={styles.summary}>
        <Text style={styles.presentText}>
          Present: {presentCount}
        </Text>

        <Text style={styles.absentText}>
          Absent: {absentCount}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {students.map((student) => (
          <View key={student.id} style={styles.card}>
            <Text style={styles.name}>{student.name}</Text>

            <View style={styles.buttons}>
              <Pressable
                style={[
                  styles.option,
                  student.status === "Present" &&
                    styles.presentSelected,
                ]}
                onPress={() =>
                  updateAttendance(student.id, "Present")
                }
              >
                <Text style={styles.optionText}>
                  {student.status === "Present" ? "✓ " : ""}
                  Present
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.option,
                  student.status === "Absent" &&
                    styles.absentSelected,
                ]}
                onPress={() =>
                  updateAttendance(student.id, "Absent")
                }
              >
                <Text style={styles.optionText}>
                  {student.status === "Absent" ? "✓ " : ""}
                  Absent
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },

  presentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },

  absentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  option: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    alignItems: "center",
  },

  presentSelected: {
    backgroundColor: "#b7e4c7",
    borderColor: "green",
  },

  absentSelected: {
    backgroundColor: "#ffc9c9",
    borderColor: "red",
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
  },
});