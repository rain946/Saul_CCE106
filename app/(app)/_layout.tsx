import { Tabs, Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';





export default function AppLayout() {
  // TODO EXAM: Check authentication and session restoration before showing the tabs.
  // TODO EXAM: Redirect unauthenticated users to /sign-in.
  const { token, authLoading } = useAuth();

    if (authLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#245bb2" />
        </View>
      );
    }

    if (!token) {
      return <Redirect href="/sign-in" />;
    }

    return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#245bb2',
            headerTintColor: '#17324d',
            tabBarIconStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="students" options={{ title: 'Students' }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
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
