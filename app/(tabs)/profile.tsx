import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Profile() {
  const [name, setName] = useState("Rainier Saul");
  const [program, setProgram] = useState("BS Information Technology");

  const [savedName, setSavedName] = useState("Rainier Saul");
  const [savedProgram, setSavedProgram] = useState(
    "BS Information Technology"
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (name.trim() === "" || program.trim() === "") {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    setSavedName(name);
    setSavedProgram(program);

    setError("");
    setMessage("Profile saved successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.avatar}
      />

      <Text style={styles.savedName}>{savedName}</Text>
      <Text style={styles.savedProgram}>{savedProgram}</Text>

      <Text style={styles.label}>Full Name</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Program / Course</Text>

      <TextInput
        style={styles.input}
        value={program}
        onChangeText={setProgram}
        placeholder="Enter your program"
      />

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      {message !== "" && (
        <Text style={styles.success}>{message}</Text>
      )}

      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  savedName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  savedProgram: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
  },

  label: {
    width: "100%",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },

  success: {
    color: "green",
    marginBottom: 10,
  },

  button: {
    width: "100%",
    backgroundColor: "#1e3a5f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
