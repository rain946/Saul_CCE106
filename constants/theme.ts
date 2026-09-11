// constants/theme.ts

export const COLORS = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  secondary: '#0F766E',
  warning: '#D97706',
  danger: '#DC2626',
  success: '#16A34A',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  softBlue: '#EFF6FF',
  softGreen: '#ECFDF5',
  softOrange: '#FFF7ED',
  softRed: '#FEF2F2',
} as const;

export const TYPOGRAPHY = {
  screenTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '500' as const,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800' as const,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '800' as const,
  },

  metricLabel: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },

  body: {
    fontSize: 13,
    fontWeight: '600' as const,
  },

  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
  },

  action: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
} as const;
