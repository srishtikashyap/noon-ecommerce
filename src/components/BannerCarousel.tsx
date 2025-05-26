import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Banner = {
  id: string;
  image: string;
};

type BannerCarouselProps = {
  banners: Banner[];
  autoPlayInterval?: number;
};

export const BannerCarousel = ({ 
  banners, 
  autoPlayInterval = 4000 
}: BannerCarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeSlide + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveSlide(next);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeSlide, banners.length, autoPlayInterval]);



  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.bannerImage}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.dotsContainer}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeSlide === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: width - 32,
    height: 150,
    borderRadius: 10,
    marginRight: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});
