import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

export type TaskStatus = "Pending" | "Completed";
export type StudyTask = { id: string; title: string; subject: string; dueDate: string; status: TaskStatus; description: string };

const initialTasks: StudyTask[] = [
  { id: "1", title: "React Native Activity", subject: "CCE106", dueDate: "September 18, 2026", status: "Pending", description: "Complete the mobile interface activity and submit the project files." },
  { id: "2", title: "Database Assignment", subject: "Information Management", dueDate: "September 20, 2026", status: "Completed", description: "Create the required database schema and answer the normalization exercises." },
  { id: "3", title: "Networking Quiz", subject: "Networking", dueDate: "September 22, 2026", status: "Pending", description: "Review network layers, protocols, and basic subnetting before the quiz." },
  { id: "4", title: "Research Paper", subject: "Capstone", dueDate: "September 25, 2026", status: "Pending", description: "Finish the initial research paper draft and prepare it for review." },
  { id: "5", title: "UI Design", subject: "HCI", dueDate: "September 27, 2026", status: "Completed", description: "Prepare a polished interface design based on the HCI principles discussed." },
];

type TasksContextValue = { tasks: StudyTask[]; toggleTaskStatus: (id: string) => void };
const TasksContext = createContext<TasksContextValue | null>(null);

function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState(initialTasks);
  const value = useMemo(() => ({
    tasks,
    toggleTaskStatus: (id: string) => setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task,
    )),
  }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used inside TasksProvider");
  return context;
}

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ contentStyle: { backgroundColor: "#F6F7FB" } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: "Task details", headerShadowVisible: false, headerStyle: { backgroundColor: "#F6F7FB" }, headerTintColor: "#17233C", headerBackTitle: "Tasks" }} />
      </Stack>
    </TasksProvider>
  );
}
