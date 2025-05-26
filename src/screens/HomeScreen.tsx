import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ListRenderItem,
  Button,
} from 'react-native';
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
import { CartButton } from '../components/CartButton';
import { ProductCard } from '../components/ProductCard';
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
    },
  ] = useLazyGetProductsQuery();

  const [
    fetchBanners,
    {
      data: banners = [],
      isLoading: isBannersLoading,
      isError: isBannersError,
    },
  ] = useLazyGetBannersQuery();

  const callApis = () => {
    fetchProducts();
    fetchBanners();
  }

  useEffect(() => {
    callApis()
  }, []);

  const getQuantity = (id: string) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

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
        <Button title='Try Again' onPress={() => callApis()} />
      </View>
    );
  }

  const handleNavigateToDetails = (id: string) => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  const handleNavigateToCart = () => {
    navigation.navigate('Cart');
  };

  const handleIncrement = (id: string) => dispatch(increment(id));
  const handleDecrement = (id: string) => dispatch(decrement(id));
  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleAddToCart = (item: Product) => dispatch(addToCart(item));

  const renderProductItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      quantity={getQuantity(item.id)}
      onPress={() => handleNavigateToDetails(item.id)}
      onIncrement={() => handleIncrement(item.id)}
      onDecrement={() => handleDecrement(item.id)}
      onRemove={() => handleRemove(item.id)}
      onAddToCart={() => handleAddToCart(item)}
    />
  );

  const extractKey = (item: Product) => item.id;

  const renderFooter = () => {
    if (cartCount > 0) {
      return <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
        <CartButton count={cartCount} onPress={handleNavigateToCart} />
      </View>
    }
    return null;
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={<BannerCarousel banners={banners} />}
        data={products}
        keyExtractor={extractKey}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderProductItem}
        contentContainerStyle={styles.contentContainer}
      />
      {renderFooter()}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
