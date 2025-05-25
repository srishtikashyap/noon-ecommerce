// src/screens/ConfirmationScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ConfirmationScreen({ navigation }: any) {
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.text}>Your order has been placed successfully!</Text>
      <Button title="Go to Home" onPress={handleGoHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 24 
  },
  icon: { 
    fontSize: 48, 
    marginBottom: 16 
  },
  text: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 24 
  },
});
