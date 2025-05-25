import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = width * 0.8;

type ProductImageProps = {
  imageUrl: string;
};

export const ProductImage = ({ imageUrl }: ProductImageProps) => (
  <Image 
    source={{ uri: imageUrl }} 
    style={styles.image}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  image: { 
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
}); 