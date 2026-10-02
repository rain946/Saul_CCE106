//* eslint-disable @typescript-eslint/no-unused-vars -- Setters and imports are reserved for exam TODOs. */
import {
  createContext, useEffect, useState, useCallback,
  type ReactNode
} from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@/constants/api';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

type AuthProfileResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = 'student_portal_token';

const secureStorageAvailable = async () => {
  return (
    Platform.OS !== 'web' &&
    (await SecureStore.isAvailableAsync())
  );
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // False keeps the unfinished starter usable; no session has been restored yet.
  const [authLoading, setAuthLoading] = useState(true);

  const login = useCallback(
    async (accessToken: string, userData: User) => {
      try {
        if (await secureStorageAvailable()) {
          await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
        }

        setToken(accessToken);
        setUser(userData);
      } catch {
        setToken(null);
        setUser(null);
        throw new Error('Unable to save the login session.');
      }
    },
    []
    // TODO EXAM: Save the access token with SecureStore.setItemAsync().
    // TODO EXAM: Update token state and user state with the supplied arguments.
    // TODO EXAM: Handle storage failures; never store the password.
  );

  const logout = useCallback(async () => {
    try {
      if (await secureStorageAvailable()) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Unable to remove the saved session.', error);
    } finally {
      setToken(null);
      setUser(null);
      router.replace('/sign-in');
    }
    // TODO EXAM: Delete the saved token using SecureStore.deleteItemAsync().
    // TODO EXAM: Clear token state and user state.
    // TODO EXAM: Handle storage errors and redirect to /sign-in after logout.
  }, []);

  const restoreSession = useCallback (async () => {
    // TODO EXAM: Set authLoading while restoring the session.
    // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
    // TODO EXAM: Validate the token via GET /profile with a Bearer token.
    // TODO EXAM: Update token and user state for a valid session.
    // TODO EXAM: Handle 401 Unauthorized / expired sessions and clear invalid credentials.
    // TODO EXAM: Handle errors and stop authLoading in finally.
    setAuthLoading(true);

        try {
          if (!(await secureStorageAvailable())) {
            setToken(null);
            setUser(null);
            return;
          }

          const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

          if (!savedToken) {
            setToken(null);
            setUser(null);
            return;
          }

          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });

          if (!response.ok) {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
            setUser(null);
            return;
          }

          const data: unknown = await response.json();

          if (
            typeof data !== 'object' ||
            data === null ||
            !('id' in data) ||
            !('firstName' in data) ||
            !('lastName' in data) ||
            !('email' in data)
          ) {
            throw new Error('Invalid session response received.');
          }

          const profile = data as AuthProfileResponse;

          setToken(savedToken);
          setUser({
            id: profile.id,
            name: `${profile.firstName} ${profile.lastName}`.trim(),
            email: profile.email,
            role: profile.role || 'user',
          });
        } catch (error) {
          console.error('Unable to restore the session.', error);

          if (await secureStorageAvailable()) {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
          }

          setToken(null);
          setUser(null);
        } finally {
          setAuthLoading(false);
        }
  },[]);

  useEffect(() => {

    // TODO EXAM: Call restoreSession() on startup.
    void restoreSession();

  }, [restoreSession]);

  // SecureStore is native-only. The web skeleton makes no storage calls.
  // TODO EXAM: Check platform availability before storage calls; test persistence on Android/iOS.
  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
