import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#3F5BF6", tabBarInactiveTintColor: "#8A93A6", tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: 2 }, tabBarStyle: { height: 68, paddingTop: 8, paddingBottom: 9, backgroundColor: "#FFFFFF", borderTopColor: "#E8EAF0" } }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks", tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
