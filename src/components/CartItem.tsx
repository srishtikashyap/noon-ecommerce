import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';
import { CartControls } from './CartControls';

type CartItemProps = {
  item: Product & { quantity: number };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

export const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) => (
  <View style={styles.itemCard}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.details}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>₹{item.price.toLocaleString('en-IN')}</Text>
      <CartControls
        quantity={item.quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        showAddToCart={false}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12
  },
  details: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  increment: {
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrement: {
    backgroundColor: '#f44336',
    width: 32,
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 16
  },
  remove: {
    marginLeft: 10
  },
  removeText: {
    color: '#555',
    fontSize: 14,
  },
}); 