// components/InventorySectionHeader.tsx

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type InventorySectionHeaderProps = {
  title: string;
  action?: string;
};

export default function InventorySectionHeader({
  title,
  action,
}: InventorySectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {action && (
        <TouchableOpacity>
          <Text style={styles.action}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },

  title: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.textPrimary,
  },

  action: {
    ...TYPOGRAPHY.action,
    color: COLORS.primary,
  },
});
