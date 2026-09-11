import { Ionicons } from '@expo/vector-icons';
import { type Href, useRouter } from 'expo-router';
import { type PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const palette = { bg: '#F3F9FE', ink: '#183C58', muted: '#567187', blue: '#24699C', baby: '#DCEFFC', border: '#D9E9F4' };
export function Page({ children }: PropsWithChildren) {
  return <SafeAreaView style={{ flex: 1, backgroundColor: palette.bg }} edges={['top', 'left', 'right']}><ScrollView contentContainerStyle={s.page} showsVerticalScrollIndicator={false}><View style={s.brand}><Ionicons name="school-outline" size={23} color={palette.blue} /><Text style={s.brandText}>STUDENT PORTAL</Text><View style={s.dot} /></View>{children}<Text style={s.footer}>A little progress, every day.</Text></ScrollView></SafeAreaView>;
}
export function Heading({ title, subtitle }: { title: string; subtitle: string }) { return <View style={{ gap: 7 }}><Text style={s.title}>{title}</Text><Text style={s.body}>{subtitle}</Text></View>; }
export function Card({ children }: PropsWithChildren) { return <View style={s.card}>{children}</View>; }
export function Field({ label, value }: { label: string; value: string }) { return <View style={s.field}><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text></View>; }
export function Button({ title, onPress }: { title: string; onPress: () => void }) { return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [s.button, pressed && { opacity: 0.7 }]}><Text style={s.buttonText}>{title}</Text><Ionicons name="arrow-forward" size={19} color="white" /></Pressable>; }
export function Back({ fallback = '/' }: { fallback?: Href }) { const router = useRouter(); return <Pressable accessibilityRole="button" onPress={() => router.canGoBack() ? router.back() : router.replace(fallback)} style={s.back}><Ionicons name="arrow-back" size={20} color={palette.blue} /><Text style={s.link}>Back</Text></Pressable>; }
export function Invalid({ kind, fallback }: { kind: string; fallback: Href }) { const router = useRouter(); return <Page><Back fallback={fallback} /><Card><Ionicons name="search-outline" size={40} color={palette.blue} /><Heading title={`${kind} not found`} subtitle="This link has an invalid or unavailable ID. Return to the portal and choose an available record." /><Button title="Return to portal" onPress={() => router.replace(fallback)} /></Card></Page>; }
export const s = StyleSheet.create({
  page: { width: '100%', maxWidth: 860, alignSelf: 'center', padding: 24, paddingBottom: 36, gap: 24 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 }, brandText: { color: palette.blue, fontSize: 11, letterSpacing: 2.3, fontWeight: '800', flex: 1 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#71B5DD' },
  title: { color: palette.ink, fontSize: 30, fontWeight: '800', letterSpacing: -1 }, body: { color: palette.muted, fontSize: 14, lineHeight: 23 },
  card: { backgroundColor: 'white', borderWidth: 1, borderColor: palette.border, borderRadius: 22, padding: 22, gap: 18 },
  hero: { backgroundColor: palette.baby, borderRadius: 26, padding: 26, gap: 16, overflow: 'hidden' }, eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.7, color: palette.blue },
  section: { color: palette.ink, fontWeight: '800', fontSize: 20, letterSpacing: -0.4 }, row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  icon: { width: 52, height: 52, borderRadius: 16, backgroundColor: palette.baby, alignItems: 'center', justifyContent: 'center' },
  field: { gap: 7, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EDF4F9' }, label: { color: palette.muted, fontSize: 12 }, value: { color: palette.ink, fontSize: 16, fontWeight: '600' },
  button: { backgroundColor: palette.blue, borderRadius: 14, padding: 16, minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, buttonText: { color: 'white', fontWeight: '700', fontSize: 14, flexShrink: 1 },
  back: { flexDirection: 'row', gap: 8, alignItems: 'center', alignSelf: 'flex-start', minHeight: 44 }, link: { color: palette.blue, fontWeight: '700', fontSize: 14 }, footer: { textAlign: 'center', color: palette.muted, fontSize: 11, letterSpacing: 0.6, marginTop: 10 },
  avatar: { width: 80, height: 80, borderRadius: 26, backgroundColor: '#B9DFF7', alignItems: 'center', justifyContent: 'center' }, initials: { color: palette.blue, fontSize: 29, fontWeight: '800' }, badge: { color: '#286550', backgroundColor: '#E3F3EB', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontSize: 11, fontWeight: '700' },
});
