import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Product } from '../types';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
    <Text style={styles.category}>{product.category}</Text>
    <View style={styles.tagContainer}>
      {product.tags?.map((tag) => (
        <Text key={tag} style={styles.tag}>
          {tag}
        </Text>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: { 
    fontSize: 22,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 12,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#1976D2',
  },
}); 