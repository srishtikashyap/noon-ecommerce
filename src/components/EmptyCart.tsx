import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EmptyCart = () => (
  <View style={styles.center}>
    <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    fontSize: 18, 
    color: '#888' 
  },
}); 