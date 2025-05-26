// ProductDetailsScreen.tsx

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increment, decrement, removeFromCart } from '../redux/features/cartSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Product } from '../types';
import { ProductImage } from '../components/ProductImage';
import { ProductInfo } from '../components/ProductInfo';
import { CartControls } from '../components/CartControls';
import { useGetProductByIdQuery } from '../redux/api/productsApi';

type ProductDetailsProps = {
  route: any;
  navigation: any;
};

export default function ProductDetailsScreen({ route, navigation }: ProductDetailsProps) {
  const { productId } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const { data: productDetail, isLoading, isError } = useGetProductByIdQuery(productId);

  const quantity = useSelector((state: RootState) => 
    state.cart.items.find((item) => item.id === productId)?.quantity || 0
  );

  const handleIncrement = () => dispatch(increment(productId));
  const handleDecrement = () => dispatch(decrement(productId));
  const handleRemove = () => dispatch(removeFromCart(productId));
  const handleAddToCart = () => dispatch(addToCart(productDetail));
  const handleGoToCart = () => navigation.navigate('Cart');


  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  if (isError || !productDetail) {
    return (
      <View style={styles.container}>
        <Text>Failed to load product.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ProductImage imageUrl={productDetail?.image} />
        <ProductInfo product={productDetail} />
        
        <View style={styles.cartSection}>
          <CartControls
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
          />

          {quantity > 0 && (
            <TouchableOpacity 
              style={styles.goToCartButton} 
              onPress={handleGoToCart}
            >
              <Text style={styles.goToCartText}>Go to Cart ({quantity})</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cartSection: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 16,
  },
  goToCartButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  goToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
