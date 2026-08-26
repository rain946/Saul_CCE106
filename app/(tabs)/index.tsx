
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.appTitle}>BizTrack</ThemedText>

      <ThemedText style={styles.appSubtitle}>
        My First Mobile App
      </ThemedText>


      <Image
        source={require('@/assets/images/pic.png')}
        style={styles.Mypic}
        contentFit="contain"
      />


      <ThemedText style={styles.name}>
        Rainier G. Saul
      </ThemedText>

      <ThemedView style={styles.line} />


      <ThemedText style={styles.course}>
        BS Information Technology
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.ideaTitle}>
          💡 App Idea
        </ThemedText>

        <ThemedText style={styles.ideaText}>
          A business management app that helps business owners organize
          tasks, track income and expenses, manage daily operations,
          and grow their business efficiently.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9E3F2',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  appTitle: {
    fontSize: 38,
     lineHeight: 60,
     fontWeight: '900',
     letterSpacing: 1,
     color: '#5B4B8A',
     textAlign: 'center',
     marginBottom: 2,
  },

  appSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#356477',
    textAlign: 'center',
    marginBottom: 5,
  },

  Mypic: {
    width: 350,
    height: 350,
    position: 'absolute',
    top: 125,
    zIndex: 2,
  },

  name: {
    fontSize: 25,
     lineHeight: 34,
     fontWeight: '700',
     fontStyle: 'italic',
     letterSpacing: 1.2,
     color: '#5B4B8A',
     textAlign: 'center',
     marginTop: 300,
     marginBottom: 4,
     zIndex: 3,
  },

  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#9E5968',
    marginVertical: 8,
  },

  course: {
    fontSize: 16,
    lineHeight: 26,
    color: '#356477',
    textAlign: 'center',
    marginBottom: 14,
  },

  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },

  ideaTitle: {
    fontSize: 21,
     lineHeight: 28,
     fontWeight: '800',
     letterSpacing: 0.5,
     color: '#4B4775',
     marginBottom: 8,
  },

  ideaText: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#5B587A',
    textAlign: 'left',
  },
});
