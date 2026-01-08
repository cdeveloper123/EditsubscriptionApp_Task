import { StyleSheet } from 'react-native';
import { FONTS } from './fonts';

// Shared colors
export const COLORS = {
  background: '#F2F2F7',
  card: '#fff',
  primary: '#002FFF',
  danger: '#FF3B30',
  success: '#34C759',
  text: '#1C1E22',
  textSecondary: '#636A79',
  textMuted: '#8E8E93',
  border: '#E5E5EA',
  chevron: '#C7C7CC',
};

// Shared styles used across the app
export const sharedStyles = StyleSheet.create({
  // Form elements
  formSection: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  formLabel: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  formValue: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  formValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: 16,
  },
  // Chevron selector
  chevronContainer: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  chevronDown: {
    marginTop: -4,
  },
  // Cards
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
  },
  // Typography
  title: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: '#000',
  },
  // Buttons
  primaryButtonText: {
    fontSize: 17,
    fontFamily: FONTS.semibold,
    color: COLORS.primary,
  },
  dangerButtonText: {
    fontSize: 17,
    fontFamily: FONTS.regular,
    color: COLORS.danger,
  },
});

