import { Switch, Text, View } from 'react-native';
import { Back, Button, Card, Heading, Page, palette, s } from '@/components/portal';
import { usePreferences } from '@/components/preferences-context';

export default function PreferencesScreen() {
  const { showStudyTip, setShowStudyTip } = usePreferences();
  return <Page><Back fallback="/settings" /><Heading title="Preferences" subtitle="Small adjustments. A more personal space." /><Card><View style={s.row}><View style={{ flex: 1, gap: 6 }}><Text style={s.section}>Study tip</Text><Text style={s.body}>Show a little encouragement on Home.</Text></View><Switch accessibilityLabel="Show study tip on Home" value={showStudyTip} onValueChange={setShowStudyTip} trackColor={{ false: '#CBD9E4', true: '#8AC6EE' }} thumbColor={showStudyTip ? palette.blue : '#FFFFFF'} /></View></Card><Text style={s.body}>Changes apply immediately and stay while the app is open.</Text><Button title="Restore default preferences" onPress={() => setShowStudyTip(true)} /></Page>;
}

