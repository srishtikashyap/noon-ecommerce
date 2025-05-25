import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions } from 'react-native';

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
  const scrollRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeSlide + 1) % banners.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setActiveSlide(next);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeSlide, banners.length, autoPlayInterval]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) =>
          setActiveSlide(Math.floor(e.nativeEvent.contentOffset.x / width))
        }
        scrollEventThrottle={16}
        style={styles.carouselContainer}
      >
        {banners.map((banner) => (
          <Image 
            key={banner.id} 
            source={{ uri: banner.image }} 
            style={styles.bannerImage} 
          />
        ))}
      </ScrollView>

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
  carouselContainer: { 
    height: 150, 
    marginBottom: 8 
  },
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