import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  addToCart,
  increment,
  decrement,
  removeFromCart,
} from '../redux/features/cartSlice';
import { Product } from '../types';
import { BannerCarousel } from '../components/BannerCarousel';
import { CategorySection } from '../components/CategorySection';
import { CartButton } from '../components/CartButton';
import {
  useLazyGetProductsQuery,
  useLazyGetBannersQuery,
} from '../redux/api/productsApi';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [
    fetchProducts,
    {
      data: products = [],
      isLoading: isProductsLoading,
      isError: isProductsError,
      isSuccess: isProductsSuccess,
    },
  ] = useLazyGetProductsQuery();

  const [
    fetchBanners,
    {
      data: banners = [],
      isLoading: isBannersLoading,
      isError: isBannersError,
      isSuccess: isBannersSuccess,
    },
  ] = useLazyGetBannersQuery();

  useEffect(() => {
    fetchProducts();
    fetchBanners();
  }, []);

  const getQuantity = (id: string) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const groupedByCategory = products.reduce((acc: Record<string, Product[]>, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isProductsLoading || isBannersLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isProductsError || isBannersError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {banners.length > 0 && <BannerCarousel banners={banners} />}

      {Object.entries(groupedByCategory).map(([category, items]) => (
        <CategorySection
          key={category}
          category={category}
          products={items}
          onProductPress={(product) =>
            navigation.navigate('ProductDetails', { productId:product.id})
          }
          onIncrement={(id) => dispatch(increment(id))}
          onDecrement={(id) => dispatch(decrement(id))}
          onRemove={(id) => dispatch(removeFromCart(id))}
          onAddToCart={(product) => dispatch(addToCart(product))}
          getQuantity={getQuantity}
        />
      ))}

      {cartCount > 0 && (
        <CartButton
          count={cartCount}
          onPress={() => navigation.navigate('Cart')}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
