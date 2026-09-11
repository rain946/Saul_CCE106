import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Field, Heading, Page, s } from '@/components/portal';
import { student } from '@/constants/portal';

export default function ProfileScreen() {
  const router = useRouter();
  return <Page><Heading title="My profile" subtitle="A little about the person behind the progress." />
    <View style={s.hero}><View style={s.avatar}><Text style={s.initials}>RS</Text></View><Text style={s.title}>{student.name}</Text><Text style={s.body}>Bachelor of Science in Information Technology</Text><Text style={s.badge}>STUDENT PORTAL MEMBER</Text></View>
    <Text style={s.section}>Student overview</Text><Card><Field label="Full name" value={student.name} /><Field label="Program" value={student.program} /><Field label="Student ID (demo)" value={student.id} /><Field label="Courses" value="CCE 106 · PHYS101 · CAPSTONE 2" /></Card>
    <Button title="View student details" onPress={() => router.push({ pathname: '/student/[id]', params: { id: student.id } })} />
  </Page>;
}

