import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const TOKEN_KEY = 'student_token';

const STUDENT = {
  name: 'Rainier G. Saul',
  username: 'rainier',
  apiUsername: 'rainier',
  email: 'rainier@gmail.com',
  password: 'rainier123',
};

const API_ACCOUNT = {
  username: 'emilys',
  password: 'emilyspass',
};

export default function Activity10() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (savedToken) {
        setToken(savedToken);
        await getProtectedProfile(savedToken);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSessionLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    if (
      username.trim() !== STUDENT.username ||
      password !== STUDENT.password
    ) {
      setError('Invalid username or password.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://dummyjson.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: API_ACCOUNT.username,
            password: API_ACCOUNT.password,
            expiresInMins: 30,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Authentication failed.'
        );
      }

      const receivedToken = data.accessToken;

      if (!receivedToken) {
        throw new Error('Authentication token was not returned.');
      }

      await AsyncStorage.setItem(
        TOKEN_KEY,
        receivedToken
      );

      setToken(receivedToken);

      await getProtectedProfile(receivedToken);
    } catch (err: any) {
      setError(
        err.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getProtectedProfile = async (
    authToken: string
  ) => {
    try {
      const response = await fetch(
        'https://dummyjson.com/auth/me',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setProfileLoaded(false);

        throw new Error(
          'Session expired. Please login again.'
        );
      }

      if (!response.ok) {
        throw new Error(
          'Unable to access protected profile.'
        );
      }

      await response.json();

      setProfileLoaded(true);
    } catch (err: any) {
      setError(
        err.message || 'Unable to load protected profile.'
      );
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);

      setToken(null);
      setProfileLoaded(false);
      setUsername('');
      setPassword('');
      setError('');

      Alert.alert(
        'Logged Out',
        'Your session has been cleared.'
      );
    } catch (err) {
      Alert.alert(
        'Error',
        'Unable to logout.'
      );
    }
  };

  if (sessionLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#1565c0"
        />

        <Text style={styles.loadingText}>
          Restoring session...
        </Text>
      </SafeAreaView>
    );
  }

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginCard}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              RS
            </Text>
          </View>

          <Text style={styles.title}>
            Student Portal
          </Text>

          <Text style={styles.subtitle}>
            Sign in to access your student profile
          </Text>

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#90a4ae"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#90a4ae"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
          />

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
              loading && styles.disabledButton,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                LOGIN
              </Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!profileLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#1565c0"
        />

        <Text style={styles.loadingText}>
          Loading protected profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            RS
          </Text>
        </View>

        <Text style={styles.welcome}>
          Welcome!
        </Text>

        <Text style={styles.name}>
          {STUDENT.name}
        </Text>

        <Text style={styles.protectedBadge}>
          PROTECTED PROFILE
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Student Name
            </Text>

            <Text style={styles.infoValue}>
              {STUDENT.name}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Username
            </Text>

            <Text style={styles.infoValue}>
              {STUDENT.username}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              API Username
            </Text>

            <Text style={styles.infoValue}>
              {STUDENT.apiUsername}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Email
            </Text>

            <Text style={styles.infoValue}>
              {STUDENT.email}
            </Text>
          </View>
        </View>

        <Text style={styles.sessionText}>
          ✓ Authenticated session active
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>
            LOGOUT
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fa',
    justifyContent: 'center',
    padding: 22,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#eef4fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#546e7a',
  },

  loginCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  logo: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#1565c0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#173b67',
  },

  subtitle: {
    fontSize: 14,
    color: '#78909c',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474f',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cfd8dc',
    backgroundColor: '#fafafa',
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 17,
    color: '#263238',
  },

  error: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: '#1565c0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: '#1565c0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  welcome: {
    textAlign: 'center',
    color: '#78909c',
    fontSize: 15,
    marginTop: 15,
  },

  name: {
    textAlign: 'center',
    color: '#173b67',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 3,
  },

  protectedBadge: {
    alignSelf: 'center',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 25,
  },

  infoContainer: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    paddingHorizontal: 15,
  },

  infoRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  infoLabel: {
    color: '#78909c',
    fontSize: 12,
    marginBottom: 3,
  },

  infoValue: {
    color: '#263238',
    fontSize: 16,
    fontWeight: '600',
  },

  sessionText: {
    color: '#2e7d32',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
});