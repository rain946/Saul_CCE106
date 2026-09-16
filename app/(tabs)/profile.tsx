import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [name, setName] = useState("Rainier Saul");
  const [program, setProgram] = useState("BS Information Technology");
  const [savedName, setSavedName] = useState("Rainier Saul");
  const [savedProgram, setSavedProgram] = useState("BS Information Technology");
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSave = () => {
    const cleanName = name.trim();
    const cleanProgram = program.trim();
    if (!cleanName || !cleanProgram) {
      setFeedback({ type: "error", text: "Please complete both fields." });
      return;
    }
    setName(cleanName); setProgram(cleanProgram); setSavedName(cleanName); setSavedProgram(cleanProgram);
    setFeedback({ type: "success", text: "Your profile has been updated." });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>ACCOUNT</Text><Text style={styles.title}>My profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{savedName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</Text></View>
            <Text style={styles.savedName}>{savedName}</Text><Text style={styles.savedProgram}>{savedProgram}</Text>
          </View>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Personal information</Text>
            <Text style={styles.label}>Full name</Text>
            <View style={styles.inputWrap}><Ionicons name="person-outline" size={18} color="#8A93A6" /><TextInput style={styles.input} value={name} onChangeText={(value) => { setName(value); setFeedback(null); }} placeholder="Enter your full name" placeholderTextColor="#A1A8B7" autoCapitalize="words" returnKeyType="next" /></View>
            <Text style={styles.label}>Program / Course</Text>
            <View style={styles.inputWrap}><Ionicons name="school-outline" size={18} color="#8A93A6" /><TextInput style={styles.input} value={program} onChangeText={(value) => { setProgram(value); setFeedback(null); }} placeholder="Enter your program" placeholderTextColor="#A1A8B7" autoCapitalize="words" returnKeyType="done" onSubmitEditing={handleSave} /></View>
            {feedback && <View style={[styles.feedback, feedback.type === "error" ? styles.errorBox : styles.successBox]}><Ionicons name={feedback.type === "error" ? "alert-circle-outline" : "checkmark-circle-outline"} size={17} color={feedback.type === "error" ? "#C94A4A" : "#16825E"} /><Text style={[styles.feedbackText, feedback.type === "error" ? styles.errorText : styles.successText]}>{feedback.text}</Text></View>}
            <Pressable onPress={handleSave} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}><Text style={styles.buttonText}>Save changes</Text></Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB"
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: "800",
    color: "#3F5BF6"
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#17233C",
    marginTop: 4,
    marginBottom: 20
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#ECEEF3"
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EBFF",
    marginBottom: 12
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3F5BF6"
  },
  savedName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#17233C"
  },
  savedProgram: {
    fontSize: 13,
    color: "#747D90",
    marginTop: 4
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ECEEF3",
    marginTop: 14
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#17233C",
    marginBottom: 18
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F596D",
    marginBottom: 7
  },
  inputWrap: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#DFE2EA",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#17233C",
    paddingVertical: 0
  },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 11,
    borderRadius: 12,
    marginBottom: 13
  },
  errorBox: {
    backgroundColor: "#FFF0F0"
  },
  successBox: {
    backgroundColor: "#E7F7F1"
  },
  feedbackText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600"
  },
  errorText: {
    color: "#C94A4A"
  },
  successText: {
    color: "#16825E"
  },
  button: {
    minHeight: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3F5BF6"
  },
  buttonPressed: {
    opacity: 0.8
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700"
  },
});
