

import { StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../constants/theme';

type BadgeProps = {
  text: string;
  variant?: 'success' | 'warning' | 'neutral';
};

export default function Badge({
  text,
  variant = 'neutral',
}: BadgeProps) {
  const background =
    variant === 'success'
      ? COLORS.successSoft
      : variant === 'warning'
        ? COLORS.warningSoft
        : COLORS.blueSoft;

  const color =
    variant === 'success'
      ? COLORS.success
      : variant === 'warning'
        ? COLORS.warning
        : COLORS.navy;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: DESIGN.sm,
    paddingVertical: 5,
    borderRadius: DESIGN.radiusSM,
  },

  text: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '700',
  },
});
