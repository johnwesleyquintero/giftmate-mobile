import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
