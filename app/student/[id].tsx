import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Back, Card, Field, Invalid, Page, s } from '@/components/portal';
import { student } from '@/constants/portal';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  if (typeof id !== 'string' || id !== student.id) return <Invalid kind="Student" fallback="/profile" />;
  return <Page><Back fallback="/profile" /><View style={s.hero}><Text style={s.eyebrow}>STUDENT RECORD</Text><View style={s.avatar}><Text style={s.initials}>RS</Text></View><Text style={s.title}>{student.name}</Text><Text style={s.body}>Learning today. Building tomorrow.</Text></View><Card><Text style={s.section}>Student information</Text><Field label="Student ID (demo)" value={id} /><Field label="Full name" value={student.name} /><Field label="Program" value="Bachelor of Science in Information Technology" /><Field label="Course count" value="3 courses" /></Card><Text style={s.body}>This activity uses a demo student ID. Official enrollment details are not connected.</Text></Page>;
}

