import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="task/[id]"s
        options={{ title: "Task Details" }}
      />
    </Stack>
  );
}
