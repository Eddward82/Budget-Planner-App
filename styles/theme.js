// Clean and minimal design system for Budget Planner App

export const theme = {
  // Neutral Color Palette
  colors: {
    // Primary neutrals
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F7',

    // Text colors
    textPrimary: '#2C3E50',
    textSecondary: '#6C757D',
    textTertiary: '#95A5A6',

    // Accent colors (soft and subtle)
    primary: '#5B7C99',
    primaryLight: '#7B9BB8',
    primaryDark: '#4A6278',

    // Status colors (muted)
    success: '#81C784',
    warning: '#FFB74D',
    error: '#E57373',
    info: '#64B5F6',

    // Chart colors (subtle palette)
    chartColors: [
      '#A5B4C4',  // Soft blue-gray
      '#B8A5C4',  // Soft purple-gray
      '#C4B5A5',  // Soft beige
      '#A5C4B4',  // Soft teal
      '#C4A5B4',  // Soft mauve
      '#B4C4A5',  // Soft sage
      '#C4BBA5',  // Soft tan
      '#A5C4BB',  // Soft mint
    ],

    // Gradient colors for buttons
    gradientStart: '#7B9BB8',
    gradientEnd: '#5B7C99',

    // Shadows
    shadowColor: '#000000',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    shadowMedium: 'rgba(0, 0, 0, 0.08)',

    // Borders
    border: '#E8EAED',
    borderLight: '#F0F1F3',
  },

  // Consistent Spacing System (base 8px)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },

  // Border Radius (soft rounded)
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },

  // Typography (minimal fonts)
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      letterSpacing: -0.2,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: 0.5,
    },
  },

  // Light Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  // Card styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Button styles
  button: {
    primary: {
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    secondary: {
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: '#E8EAED',
    },
  },
};

export default theme;
