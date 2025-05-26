import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../types';
import { CartControls } from './CartControls';


const { width } = Dimensions.get('window');
const cardWidth = (width - 16 * 3) / 2;

type ProductCardProps = {
  product: Product;
  quantity: number;
  onPress: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onAddToCart: () => void;
};

export const ProductCard = ({
  product,
  quantity,
  onPress,
  onIncrement,
  onDecrement,
  onRemove,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₹{(product.price).toLocaleString('en-IN')}</Text>
        <View style={styles.tagContainer}>
          {product.tags?.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </TouchableOpacity>


      <CartControls
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        onAddToCart={onAddToCart}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 6,
  },
  productName: {
    fontSize: 14,
    marginTop: 8,
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: 4,
    color: '#2196F3',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    fontSize: 10,
    color: '#555',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qty: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButtonContainer: {
    marginLeft: 4,
  },
});