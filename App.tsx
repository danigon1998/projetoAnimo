import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

