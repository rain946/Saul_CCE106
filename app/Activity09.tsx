import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Activity09() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      setError('Unable to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quotes App</Text>
      <Text style={styles.subtitle}>QUOTE OF THE DAY</Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : quote ? (
          <>
            <Text style={styles.quote}>"{quote}"</Text>
            <Text style={styles.author}>— {author}</Text>
          </>
        ) : (
          <Text style={styles.empty}>No quote available.</Text>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}
        onPress={fetchQuote}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'LOADING...' : 'NEW QUOTE'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#173b67',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#159bc2',
    marginBottom: 25,
  },

  card: {
    width: '100%',
    minHeight: 230,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  quote: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1d3557',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 20,
  },

  author: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
  },

  error: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },

  empty: {
    fontSize: 16,
    color: '#777',
  },

  button: {
    backgroundColor: '#159bc2',
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 30,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});