import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PreferencesProvider } from '@/components/preferences-context';

export default function RootLayout() {
  return <PreferencesProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F3F9FE' } }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="course/[id]" />
    <Stack.Screen name="student/[id]" />
    <Stack.Screen name="preferences" />
  </Stack></PreferencesProvider>;
}

