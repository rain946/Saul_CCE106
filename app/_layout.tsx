import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';


function RootNavigator() {
  const { token, authLoading } = useAuth();

  if (authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#245bb2" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(token)}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="student/[id]"
          options={{ title: 'Student Details' }}
        />
      </Stack.Protected>
    </Stack>
  );
}





export default function RootLayout() {
  // TODO EXAM: Check authentication state and wait for session restoration.
  // TODO EXAM: Protect (app) AND student/[id]; redirect unauthenticated users to /sign-in.
  return (
     <AuthProvider>
       <RootNavigator />
     </AuthProvider>
   );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f5fa',
  },
});
