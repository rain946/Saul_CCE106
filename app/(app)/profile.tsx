import {
  ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/constants/api';

type Profile = {
  id?: string | number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;

};

export default function ProfileScreen() {
  const { token, logout } = useAuth();
  // TODO EXAM: Load GET /profile with fetch(), async/await, and the Bearer token.
  // TODO EXAM: Add loading/error state with useState and call the loader using useEffect.
  // TODO EXAM: Check response.ok, handle 401 Unauthorized, and display returned profile data.

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadProfile = useCallback(async () => {
     setLoading(true);
     setError('');

     try {
       const response = await fetch(`${API_BASE_URL}/users/1`, {
         headers: token
           ? {
               Authorization: `Bearer ${token}`,
             }
           : undefined,
       });

       if (response.status === 401) {
         await logout();
         return;
       }

       if (!response.ok) {
         throw new Error('Unable to load your profile.');
       }

       const data: unknown = await response.json();

       if (
         typeof data !== 'object' ||
         data === null ||
         !('id' in data)
       ) {
         throw new Error('Invalid profile data received.');
       }

       setProfile(data as Profile);
     } catch (error) {
       const message =
         error instanceof Error
           ? error.message
           : 'Something went wrong while loading your profile.';

       setProfile(null);
       setError(message);
     } finally {
       setLoading(false);
     }
   }, [token, logout]);

   useEffect(() => {
     void loadProfile();
   }, [loadProfile]);





   return (
       <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>MY PROFILE</Text>

         {loading ? (
           <View style={styles.state}>
             <ActivityIndicator color="#245bb2" />
             <Text style={styles.text}>Loading profile…</Text>
           </View>
         ) : error ? (
           <View style={styles.state}>
             <Text style={styles.error}>{error}</Text>

             <Pressable
               accessibilityRole="button"
               style={styles.retryButton}
               onPress={loadProfile}
             >
               <Text style={styles.buttonText}>Try Again</Text>
             </Pressable>
           </View>
         ) : profile ? (
           <View style={styles.card}>
             <Text style={styles.text}>
               Name: {profile.name || '—'}
             </Text>

             <Text style={styles.text}>
               Username: {profile.username || '—'}
             </Text>

             <Text style={styles.text}>
               Email: {profile.email || '—'}
             </Text>

             <Text style={styles.text}>
               Phone: {profile.phone || '—'}
             </Text>

             <Text style={styles.text}>
               Website: {profile.website || '—'}
             </Text>
           </View>
         ) : (
           <Text style={styles.text}>No profile available.</Text>
         )}

         <Text style={styles.text}>
           Session Status: {token ? 'Authenticated' : 'Not Authenticated'}
         </Text>

         <Pressable
           accessibilityRole="button"
           style={({ pressed }) => [
             styles.button,
             pressed && styles.buttonPressed,
           ]}
           onPress={logout}
         >
           <Text style={styles.buttonText}>LOGOUT</Text>
         </Pressable>
       </ScrollView>
     );
   }

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  note: { color: '#536579', fontSize: 12 },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
  state: {
      padding: 24,
      gap: 12,
      alignItems: 'center',
  },
  error: {
     color: '#b42318',
     textAlign: 'center',
  },
  retryButton: {
     backgroundColor: '#245bb2',
     paddingHorizontal: 20,
     paddingVertical: 12,
     borderRadius: 8,
   },
   buttonPressed: {
     opacity: 0.7,
   },
});
