// components/PrimaryAction.tsx

import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../constants/theme';

type PrimaryActionProps = {
  title: string;
  onPress: () => void;
};

export default function PrimaryAction({
  title,
  onPress,
}: PrimaryActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: DESIGN.radiusMD,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DESIGN.lg,
  },

  pressed: {
    backgroundColor: COLORS.navyDark,
  },

  text: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});
