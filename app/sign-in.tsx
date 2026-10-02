//* eslint-disable @typescript-eslint/no-unused-vars -- Setters are reserved for the login exercise. */


import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  accessToken: string;
};

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // TODO EXAM: 1. Validate email and password.
    // TODO EXAM: 2. Set loading and clear previous errors.
    // TODO EXAM: 3. POST to /login using fetch() and async/await.
    // TODO EXAM: 4. Check response.ok and parse the returned JSON.
    // TODO EXAM: 5. Pass the returned access token and user to the context login().
    // TODO EXAM: 6. Navigate using router.replace() after successful authentication.
    // TODO EXAM: 7. Handle login errors and stop loading in finally.
    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: cleanUsername,
          password,
          expiresInMins: 30,
        }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const apiMessage =
          typeof data === 'object' &&
          data !== null &&
          'message' in data &&
          typeof data.message === 'string'
            ? data.message
            : 'Invalid username or password.';

        throw new Error(apiMessage);
      }

      if (
        typeof data !== 'object' ||
        data === null ||
        !('accessToken' in data) ||
        typeof data.accessToken !== 'string'
      ) {
        throw new Error('Invalid login response received.');
      }

      const authenticatedUser = data as LoginResponse;

      await login(authenticatedUser.accessToken, {
        id: authenticatedUser.id,
        name: `${authenticatedUser.firstName} ${authenticatedUser.lastName}`.trim(),
        email: authenticatedUser.email,
        role: authenticatedUser.role || 'user',
      });

      router.replace('/(app)');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>
          CCE106 • PRACTICAL EXAMINATION
        </Text>

        <Text style={styles.title}>Student Service Portal</Text>

        <Text style={styles.subtitle}>
          Sign in to access student services.
        </Text>

        <Text style={styles.label}>Username</Text>

        <TextInput
          style={styles.input}
          accessibilityLabel="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          accessibilityLabel="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          onSubmitEditing={() => {
            void handleLogin();
          }}
        />

        <View
          style={styles.feedback}
          accessibilityLiveRegion="polite"
        >
          {loading ? (
            <ActivityIndicator
              color="#245bb2"
              accessibilityLabel="Signing in"
            />
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            loading && styles.buttonDisabled,
            pressed && !loading && styles.buttonPressed,
          ]}
          onPress={() => {
            void handleLogin();
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in…' : 'Login'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f5fa',
  },
  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#245bb2',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
  },
  subtitle: {
    color: '#536579',
    marginTop: 8,
    marginBottom: 24,
  },
  label: {
    color: '#17324d',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c6d2e1',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#17324d',
  },
  feedback: {
    minHeight: 36,
    gap: 8,
    alignItems: 'center',
  },
  error: {
    color: '#b42318',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
