// src/screens/CartScreen.tsx

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  increment,
  decrement,
  removeFromCart,
} from '../redux/features/cartSlice';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { EmptyCart } from '../components/EmptyCart';

export default function CartScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrement = (id: string) => dispatch(increment(id));
  const handleDecrement = (id: string) => dispatch(decrement(id));
  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleCheckout = () => navigation.navigate('CartReview');

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const renderItem = ({ item }: { item: typeof cartItems[0] }) => (
    <CartItem
      item={item}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
      onRemove={() => handleRemove(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <CartSummary 
        total={total} 
        onCheckout={handleCheckout} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
});
