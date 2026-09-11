// components/StockItem.tsx

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

type StockItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  category: string;
  quantity: string;
  status: 'In Stock' | 'Low Stock';
};

export default function StockItem({
  icon,
  name,
  category,
  quantity,
  status,
}: StockItemProps) {
  const isLowStock = status === 'Low Stock';

  return (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={19}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.quantity}>{quantity}</Text>

        <View
          style={[
            styles.status,
            {
              backgroundColor: isLowStock
                ? COLORS.softOrange
                : COLORS.softGreen,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: isLowStock
                  ? COLORS.warning
                  : COLORS.success,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },

  info: {
    flex: 1,
  },

  name: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },

  category: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  right: {
    alignItems: 'flex-end',
  },

  quantity: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },

  status: {
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },

  statusText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
  },
});
