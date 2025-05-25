import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CartButtonProps = {
  count: number;
  onPress: () => void;
};

export const CartButton = ({ count, onPress }: CartButtonProps) => {
  if (count === 0) return null;

  return (
    <TouchableOpacity style={styles.cartButton} onPress={onPress}>
      <Text style={styles.cartButtonText}>View Cart ({count})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    marginTop: 24,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 