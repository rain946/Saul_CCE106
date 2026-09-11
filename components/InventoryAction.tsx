// components/InventoryAction.tsx

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type InventoryActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

export default function InventoryAction({
  icon,
  title,
  description,
}: InventoryActionProps) {
  return (
    <TouchableOpacity style={styles.action}>
      <Ionicons
        name={icon}
        size={22}
        color={COLORS.primary}
      />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
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

  title: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },

  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
