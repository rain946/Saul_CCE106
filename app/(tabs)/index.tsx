import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Heading, Page, palette, s } from '@/components/portal';
import { courses } from '@/constants/portal';
import { usePreferences } from '@/components/preferences-context';

export default function HomeScreen() {
  const { showStudyTip } = usePreferences();
  return <Page>
    <Heading title="Your campus, connected." subtitle="Everything you need for your student journey." />
    <View style={s.hero}>
      <View style={s.row}><Text style={[s.eyebrow, { flex: 1 }]}>YOUR PERSONAL SPACE</Text><Ionicons name="sunny-outline" size={30} color={palette.blue} /></View>
      <Text style={[s.title, { fontSize: 34 }]}>Welcome back,{'\n'}Rainier!</Text>
      <Text style={s.body}>A fresh start to learn, build, and grow.</Text>
      <Link href="/profile" style={s.link}>View my profile →</Link>
    </View>
    <View style={s.row}>
      <View style={[s.card, { flex: 1, gap: 6 }]}><Text style={s.eyebrow}>MY COURSES</Text><Text style={s.title}>03</Text><Text style={s.label}>Courses to explore</Text></View>
      <View style={[s.card, { flex: 1, gap: 6 }]}><Text style={s.eyebrow}>MY PROGRAM</Text><Text style={s.title}>BSIT</Text><Text style={s.label}>Information Technology</Text></View>
    </View>
    <View style={{ gap: 5 }}><Text style={s.section}>My courses</Text><Text style={s.body}>Pick a course to see the details.</Text></View>
    <View style={{ gap: 12 }}>{courses.map((course, index) => <Link key={course.id} href={{ pathname: '/course/[id]', params: { id: course.id } }} asChild><Pressable style={({ pressed }) => [s.card, { gap: 14, opacity: pressed ? 0.65 : 1 }]} accessibilityLabel={'Open ' + course.code + ' course details'}>
      <View style={s.row}><View style={[s.icon, { backgroundColor: ['#DCEFFC', '#E8ECFC', '#E0F3F1'][index] }]}><Ionicons name={course.icon} size={25} color={palette.blue} /></View><View style={{ flex: 1, gap: 5 }}><Text style={s.section}>{course.code}</Text><Text style={s.body}>{course.title}</Text></View><Ionicons name="chevron-forward" size={20} color={palette.blue} /></View>
      <Text style={s.eyebrow}>{course.category}</Text>
    </Pressable></Link>)}</View>
    {showStudyTip && <View style={[s.hero, { padding: 20 }]}><View style={s.row}><Ionicons name="bulb-outline" size={22} color={palette.blue} /><Text style={s.link}>One step at a time</Text></View><Text style={s.body}>Big projects start with small steps. Choose one thing to learn or improve today.</Text></View>}
  </Page>;
}
