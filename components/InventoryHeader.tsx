// components/InventoryHeader.tsx

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type InventoryHeaderProps = {
  title: string;
  subtitle: string;
};

export default function InventoryHeader({
  title,
  subtitle,
}: InventoryHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleArea}>
        <View style={styles.logo}>
          <Ionicons
            name="cube-outline"
            size={22}
            color={COLORS.primary}
          />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.profileButton}
        accessibilityLabel="Open profile"
      >
        <Ionicons
          name="person-outline"
          size={20}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxl,
  },

  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },

  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.textPrimary,
  },

  subtitle: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
