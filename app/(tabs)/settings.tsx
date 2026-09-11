import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Field, Heading, Page, palette, s } from '@/components/portal';
import { usePreferences } from '@/components/preferences-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { showStudyTip } = usePreferences();
  return <Page><Heading title="Make it yours." subtitle="Simple settings for your everyday student life." />
    <View style={s.hero}><Ionicons name="options-outline" size={38} color={palette.blue} /><Text style={s.section}>Your portal, your preferences</Text><Text style={s.body}>Choose what appears on your home screen.</Text></View>
    <Card><Text style={s.section}>Preferences</Text><Field label="Appearance" value="Baby blue" /><Field label="Home study tip" value={showStudyTip ? 'Visible' : 'Hidden'} /><Button title="Manage preferences" onPress={() => router.push('/preferences')} /></Card>
    <Card><Text style={s.section}>About this portal</Text><Text style={s.body}>Rainier G Saul · BSIT{ '\n' }Student Portal mini project{ '\n' }Version 1.0</Text></Card>
  </Page>;
}

