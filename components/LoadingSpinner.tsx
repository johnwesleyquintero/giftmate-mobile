import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  fullscreen = false,
}) => {
  const containerStyle = fullscreen ? styles.fullscreen : styles.container;

  return (
    <View 
      style={containerStyle}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
    >
      <ActivityIndicator 
        size={size} 
        color={color}
        accessibilityLiveRegion="polite"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;