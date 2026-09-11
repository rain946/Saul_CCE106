import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Back, Card, Field, Invalid, Page, palette, s } from '@/components/portal';
import { courses } from '@/constants/portal';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const course = typeof id === 'string' ? courses.find(item => item.id === id) : undefined;
  if (!course) return <Invalid kind="Course" fallback="/" />;
  return <Page><Back /><View style={s.hero}><Ionicons name={course.icon} size={42} color={palette.blue} /><Text style={s.eyebrow}>{course.category}</Text><Text style={s.title}>{course.code}</Text><Text style={s.section}>{course.title}</Text></View><Card><Text style={s.section}>About this course</Text><Text style={s.body}>{course.description}</Text><Field label="Course code" value={course.code} /><Field label="Program" value="BSIT" /><Field label="Schedule & instructor" value="To be announced" /></Card></Page>;
}

