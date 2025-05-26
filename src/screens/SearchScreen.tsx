// src/screens/SearchScreen.tsx

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useGetProductsQuery } from '../redux/api/productsApi';

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);


  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  const filtered = query
    ? products.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  const renderItem = ({ item }: any) => {

    return (
      <Pressable onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.tagContainer}>
              {item.tags?.map((tag: string) => (
                <Text key={tag} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        autoFocus
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <Text style={styles.empty}>
            {query ? "No products match your search." : "Start typing to search products..."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 14,
    marginVertical: 4
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 10,
    color: '#555',
  },
});
