// components/SectionTitle.tsx

import { StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../constants/theme';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DESIGN.md,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.caption,
    marginTop: 4,
  },
});
