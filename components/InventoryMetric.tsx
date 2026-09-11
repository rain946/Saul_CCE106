// components/InventoryMetric.tsx

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type InventoryMetricProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  note: string;
  iconBackground: string;
  iconColor: string;
};

export default function InventoryMetric({
  icon,
  label,
  value,
  note,
  iconBackground,
  iconColor,
}: InventoryMetricProps) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: iconBackground },
        ]}
      >
        <Ionicons
          name={icon}
          size={19}
          color={iconColor}
        />
      </View>

      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.note}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 150,
    minWidth: 145,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },

  label: {
    ...TYPOGRAPHY.metricLabel,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },

  value: {
    ...TYPOGRAPHY.metricValue,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },

  note: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
});
