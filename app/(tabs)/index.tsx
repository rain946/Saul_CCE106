import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CounterProps = {
  increment?: number;
};

function Counter({ increment = 1 }: CounterProps) {
  const [count, setCount] = useState(0);

  const decrease = () => {
    setCount((currentCount) => Math.max(0, currentCount - increment));
  };

  const increase = () => {
    setCount((currentCount) => currentCount + increment);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Current count</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.controls}>
        <Pressable
          disabled={count === 0}
          onPress={decrease}
          style={[styles.button, count === 0 && styles.disabledButton]}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Pressable onPress={reset} style={[styles.button, styles.resetButton]}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </Pressable>

        <Pressable onPress={increase} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Counter increment={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 24,
  },
  title: {
    marginBottom: 24,
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
  },
  label: {
    color: '#666666',
    fontSize: 16,
  },
  count: {
    marginVertical: 24,
    fontSize: 64,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    width: 72,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#a3a3a3',
  },
  resetButton: {
    width: 70,
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
