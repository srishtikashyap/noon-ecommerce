import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

type CategorySectionProps = {
  category: string;
  products: Product[];
  onProductPress: (product: Product) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  getQuantity: (productId: string) => number;
};

export const CategorySection = ({
  category,
  products,
  onProductPress,
  onIncrement,
  onDecrement,
  onRemove,
  onAddToCart,
  getQuantity,
}: CategorySectionProps) => {
  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={products}
        contentContainerStyle={{ paddingBottom: 4 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            quantity={getQuantity(item.id)}
            onPress={() => onProductPress(item)}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
            onRemove={() => onRemove(item.id)}
            onAddToCart={() => onAddToCart(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: { 
    marginTop: 24 
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
}); 