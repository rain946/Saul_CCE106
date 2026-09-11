import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { palette } from '@/components/portal';

export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: palette.blue, tabBarInactiveTintColor: palette.muted, tabBarActiveBackgroundColor: '#EDF7FE', tabBarStyle: { backgroundColor: 'white', borderTopColor: palette.border, paddingTop: 8 }, tabBarItemStyle: { borderRadius: 16, marginHorizontal: 8 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '700' } }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} /> }} />
    <Tabs.Screen name="explore" options={{ href: null }} />
  </Tabs>;
}

