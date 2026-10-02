//* eslint-disable @typescript-eslint/no-unused-vars -- State setters and loader are exam placeholders. */
import { useEffect, useState, useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const studentId = Array.isArray(id) ? id[0] : id;

  const loadStudent = useCallback (async () => {
    // TODO EXAM: Validate the id read from useLocalSearchParams().
    // TODO EXAM: Set loading and clear previous errors.
    // TODO EXAM: GET /students/{id} with fetch(), async/await, and a Bearer token.
    // TODO EXAM: Check response.ok; handle 401 Unauthorized and missing records.
    // TODO EXAM: Parse JSON and update student state.
    // TODO EXAM: Handle errors and stop loading in finally.

    if (!studentId || !/^\d+$/.test(studentId)) {
          setStudent(null);
          setError('Invalid student ID.');
          setLoading(false);
          return;
    }
    setLoading(true);
        setError('');

        try {
          const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(studentId)}`,
            {
              headers: token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : undefined,
            }
          );

          if (response.status === 401) {
            await logout();
            return;
          }

          if (response.status === 404) {
            throw new Error('Student record was not found.');
          }

          if (!response.ok) {
            throw new Error('Unable to load student details.');
          }

          const data: unknown = await response.json();

          if (
            typeof data !== 'object' ||
            data === null ||
            !('id' in data)
          ) {
            throw new Error('Invalid student data received.');
          }

          setStudent(data as Student);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Something went wrong while loading the student.';

          setStudent(null);
          setError(message);
        } finally {
          setLoading(false);
        }
      }, [studentId, token, logout]
  );



  useEffect(() => {
    // TODO EXAM: Call loadStudent() when id changes.
    void loadStudent();
  }, [loadStudent]);

  return (
       <ScrollView contentContainerStyle={styles.container}>
         <Text style={styles.title}>Student Details</Text>

         {loading ? (
           <View style={styles.state}>
             <ActivityIndicator color="#245bb2" />
             <Text style={styles.text}>Loading student…</Text>
           </View>
         ) : error ? (
           <View style={styles.state}>
             <Text style={styles.error}>{error}</Text>

             <Pressable
               accessibilityRole="button"
               style={styles.retryButton}
               onPress={loadStudent}
             >
               <Text style={styles.buttonText}>Try Again</Text>
             </Pressable>
           </View>
         ) : student ? (
           <View style={styles.card}>
             <Text style={styles.text}>
               ID: {student.id ?? '—'}
             </Text>

             <Text style={styles.text}>
               Name: {student.name || '—'}
             </Text>

             <Text style={styles.text}>
               Email: {student.email || '—'}
             </Text>
           </View>
         ) : (
           <Text style={styles.text}>
             No student record available.
           </Text>
         )}

         <Pressable
           accessibilityRole="button"
           style={styles.button}
           onPress={() => router.back()}
         >
           <Text style={styles.buttonText}>Back</Text>
         </Pressable>
       </ScrollView>
     );
   }


const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 28, fontWeight: '700' },
  state: { gap: 12, alignItems: 'center' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  error: { color: '#b42318' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
  retryButton: {
    backgroundColor: '#245bb2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },

});
