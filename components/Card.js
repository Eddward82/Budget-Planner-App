import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../styles/theme';

export const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
    marginBottom: theme.spacing.md,
  },
});

export default Card;
