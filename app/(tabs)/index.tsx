import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [message, setMessage] = useState('');

  const [savedInfo, setSavedInfo] = useState({
    fullName: '',
    age: '',
    course: '',
    yearLevel: '',
    message: '',
  });

  const handleSave = () => {
    setSavedInfo({
      fullName,
      age,
      course,
      yearLevel,
      message,
    });

    Alert.alert('Saved!', 'Your basic information has been saved.');
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>

        <ThemedText style={styles.appTitle}>
          BizTrack
        </ThemedText>

        <ThemedText style={styles.appSubtitle}>
          My First Mobile App
        </ThemedText>

        <Image
          source={require('@/assets/images/pic.png')}
          style={styles.Mypic}
          contentFit="contain"
        />

        {/* NAME */}
        <ThemedText style={styles.name}>
         Your Information
        </ThemedText>

        {savedInfo.fullName !== '' && (
          <View style={styles.savedInfoCard}>
            <ThemedText style={styles.savedTitle}>
              Basic Information
            </ThemedText>

            <ThemedText style={styles.savedText}>
              Name: {savedInfo.fullName}
            </ThemedText>

            <ThemedText style={styles.savedText}>
              Age: {savedInfo.age}
            </ThemedText>

            <ThemedText style={styles.savedText}>
              Course: {savedInfo.course}
            </ThemedText>

            <ThemedText style={styles.savedText}>
              Year Level: {savedInfo.yearLevel}
            </ThemedText>

            <ThemedText style={styles.savedText}>
              Message: {savedInfo.message}
            </ThemedText>
          </View>
        )}

        <View style={styles.line} />

        <ThemedText style={styles.courseText}>
          BS Information Technology
        </ThemedText>

        <View style={styles.formCard}>

          <ThemedText style={styles.formTitle}>
            Basic Information
          </ThemedText>

          <ThemedText style={styles.label}>
            Full Name
          </ThemedText>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <ThemedText style={styles.label}>
            Age
          </ThemedText>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <ThemedText style={styles.label}>
            Course
          </ThemedText>

          <TextInput
            style={styles.input}
            value={course}
            onChangeText={setCourse}
          />

          <ThemedText style={styles.label}>
            Year Level
          </ThemedText>

          <TextInput
            style={styles.input}
            value={yearLevel}
            onChangeText={setYearLevel}
          />

          <ThemedText style={styles.label}>
            Input Something...
          </ThemedText>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <ThemedText style={styles.saveButtonText}>
              Save Information
            </ThemedText>
          </TouchableOpacity>

        </View>

   
        <View style={styles.card}>
          <ThemedText style={styles.ideaTitle}>
            💡 App Idea
          </ThemedText>

          <ThemedText style={styles.ideaText}>
            A business management app that helps business owners organize
            tasks, track income and expenses, manage daily operations,
            and grow their business efficiently.
          </ThemedText>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#B9E3F2',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#B9E3F2',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 50,
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
    marginBottom: 10,
    zIndex: 3,
  },



  savedInfoCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },

  savedTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '800',
    color: '#5B4B8A',
    marginBottom: 7,
    textAlign: 'center',
  },

  savedText: {
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '600',
    color: '#356477',
  },

  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#9E5968',
    marginVertical: 8,
  },

  courseText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#356477',
    textAlign: 'center',
    marginBottom: 20,
  },

  formCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '800',
    color: '#4B4775',
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#356477',
    marginBottom: 5,
  },

  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: '#91BAC9',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#355563',
    marginBottom: 14,
  },

  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5B4B8A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
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