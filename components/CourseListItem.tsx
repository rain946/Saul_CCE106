// components/CourseListItem.tsx

import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../constants/theme';

type CourseListItemProps = {
  code: string;
  title: string;
  schedule: string;
  units: string;
  onPress: () => void;
};

export default function CourseListItem({
  code,
  title,
  schedule,
  units,
  onPress,
}: CourseListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.codeBox}>
        <Text style={styles.code}>{code}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.schedule}>
          {schedule}
        </Text>
      </View>

      <View style={styles.unitsBox}>
        <Text style={styles.units}>{units}</Text>
        <Text style={styles.unitsLabel}>units</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusMD,
    padding: DESIGN.md,
    marginBottom: DESIGN.sm,
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  pressed: {
    opacity: 0.72,
  },

  codeBox: {
    width: 52,
    height: 52,
    borderRadius: DESIGN.radiusMD,
    backgroundColor: COLORS.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DESIGN.md,
  },

  code: {
    color: COLORS.navy,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '800',
  },

  details: {
    flex: 1,
    paddingRight: DESIGN.sm,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    lineHeight: 19,
  },

  schedule: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginTop: 5,
  },

  unitsBox: {
    alignItems: 'center',
    minWidth: 38,
  },

  units: {
    color: COLORS.navy,
    fontSize: TYPOGRAPHY.subheading,
    fontWeight: '800',
  },

  unitsLabel: {
    color: COLORS.textMuted,
    fontSize: TYPOGRAPHY.small,
  },
});
