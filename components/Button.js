import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={[styles.primaryText, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.secondaryButton, style]}
    >
      <Text style={[styles.secondaryText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: theme.button.primary.borderRadius,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  gradient: {
    paddingVertical: theme.button.primary.paddingVertical,
    paddingHorizontal: theme.button.primary.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    ...theme.typography.button,
    color: theme.colors.surface,
  },
  secondaryButton: {
    ...theme.button.secondary,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});

export default Button;
