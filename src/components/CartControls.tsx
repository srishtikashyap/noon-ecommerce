import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type CartControlsProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onAddToCart?: () => void;
  showAddToCart?: boolean
};

export const CartControls = ({
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  onAddToCart,
  showAddToCart
}: CartControlsProps) => (
  <View>
    {quantity > 0 ? (
      <View style={styles.controls}>
        <TouchableOpacity style={styles.decrement} onPress={onDecrement}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{quantity}</Text>

        <TouchableOpacity style={styles.increment} onPress={onIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    ) : showAddToCart !== false ? ( // <-- only show if flag is not false
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    ) : null}

  </View>
);

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 2,
  },
  increment: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrement: {
    backgroundColor: '#f44336',
    width: 24,
    height: 24,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  removeButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  removeText: {
    color: '#555',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
