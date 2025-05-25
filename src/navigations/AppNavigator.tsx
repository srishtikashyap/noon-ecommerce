import React from 'react';
import { TouchableOpacity , Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CartReviewScreen from '../screens/CartReviewScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('Search')}
                style={{ marginRight: 10 }}
              >
                {/* <Icon name="search" size={24} color="#000" /> */}
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Search</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="CartReview" component={CartReviewScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
