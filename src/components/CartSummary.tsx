import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type CartSummaryProps = {
  total: number;
  onCheckout: () => void;
};

export const CartSummary = ({ total, onCheckout }: CartSummaryProps) => (
  <View style={styles.summary}>
    <Text style={styles.total}>Total: ₹{total.toLocaleString('en-IN')}</Text>
    <Button title="Checkout" onPress={onCheckout} />
  </View>
);

const styles = StyleSheet.create({
  summary: { 
    borderTopWidth: 1, 
    paddingTop: 16, 
    marginTop: 16 
  },
  total: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
}); 