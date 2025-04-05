import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#6200EE',
    primaryDark: '#3700B3',
    secondary: '#03DAC6',
    secondaryDark: '#018786',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    textSecondary: '#757575',
    disabled: '#BDBDBD',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32
    },
    body1: {
      fontSize: 16,
      lineHeight: 24
    },
    body2: {
      fontSize: 14,
      lineHeight: 20
    },
    caption: {
      fontSize: 12,
      lineHeight: 16
    }
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    round: 9999
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3
    }
  },
  dimensions: {
    screenWidth: width,
    screenHeight: height
  },
  // Accessibility
  a11y: {
    minimumTouchSize: 44, // iOS minimum touch target size
    buttonPressedOpacity: 0.7
  },
  // Animation durations
  animation: {
    fast: 200,
    normal: 300,
    slow: 500
  }
};

export type Theme = typeof theme;