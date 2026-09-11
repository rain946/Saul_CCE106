import { StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../constants/theme';

type InfoItemProps = {
  label: string;
  value: string;
};

export default function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DESIGN.md,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    marginBottom: 4,
  },

  value: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
