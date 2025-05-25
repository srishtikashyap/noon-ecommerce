// src/screens/CartReviewScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { clearCart } from '../redux/features/cartSlice';

export default function CartReviewScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% mock tax
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigation.navigate('Confirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>₹{(item.price * item.quantity).toLocaleString('en-IN')}</Text>
          </View>
        )}
      />
      <View style={styles.summary}>
        <Text>Subtotal: ₹{subtotal.toLocaleString('en-IN')}</Text>
        <Text>Tax (10%): ₹{tax.toLocaleString('en-IN')}</Text>
        <Text style={styles.total}>Total: ₹{total.toLocaleString('en-IN')}</Text>
      </View>

      <View style={styles.payment}>
        <Text style={styles.paymentLabel}>Payment Method:</Text>
        <Text style={styles.paymentValue}>Cash on Delivery</Text>
      </View>

      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summary: { marginTop: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  payment: { marginVertical: 24 },
  paymentLabel: { fontSize: 16, fontWeight: '500' },
  paymentValue: { fontSize: 16, marginTop: 4 },
});
