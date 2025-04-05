import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { Feather } from '@expo/vector-icons';

type Gift = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  store: string;
  recommended?: boolean;
};

const CACHE_KEY = '@gifts_cache';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

const loadCachedGifts = async (): Promise<Gift[] | null> => {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error('Error loading cached gifts:', error);
    return null;
  }
};

const saveGiftsToCache = async (gifts: Gift[]) => {
  try {
    const cacheData = {
      data: gifts,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error saving gifts to cache:', error);
  }
};

const initialGifts: Gift[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 129.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=200',
    store: 'Amazon',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200',
    store: 'Best Buy',
  },
];

export default function GiftsScreen() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  const fetchGifts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try loading from cache first
      const cachedGifts = await loadCachedGifts();
      if (cachedGifts) {
        setGifts(cachedGifts);
        setLoading(false);
        return;
      }

      const { data: giftsData, error: supabaseError } = await supabase
        .from('gifts')
        .select('*');

      if (supabaseError) throw supabaseError;

      if (session?.user) {
        type Recommendation = {
          gift_id: string;
        };
        const { data: recommendations, error: recError } = await supabase.rpc<Recommendation[]>(
          'get_gift_recommendations',
          {
            user_id: session.user.id,
          },
        );

        if (recError) throw recError;

        const giftsWithRecommendations = giftsData.map((gift) => ({
          ...gift,
          recommended: recommendations?.some((rec) => rec.gift_id === gift.id),
        }));

        setGifts(giftsWithRecommendations);
        await saveGiftsToCache(giftsWithRecommendations);
      } else {
        setGifts(giftsData);
        await saveGiftsToCache(giftsData);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch gifts';
      setError(message);
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGifts();
    setRefreshing(false);
  };

  useEffect(() => {
    const initializeGifts = async () => {
      const cached = await loadCachedGifts();
      if (cached) {
        setGifts(cached);
      }
      fetchGifts();
    };

    initializeGifts();
  }, [session, fetchGifts]);

  const renderGift = ({ item }: { item: Gift }) => (
    <TouchableOpacity style={styles.giftCard}>
      <Image source={{ uri: item.image }} style={styles.giftImage} />
      <View style={styles.giftInfo}>
        <Text style={styles.giftName}>{item.name}</Text>
        <Text style={styles.giftPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.giftMeta}>
          <Text style={styles.giftStore}>{item.store}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Feather name="star" size={16} color="#FFD700" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchGifts}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading gifts...</Text>
        </View>
      ) : (
        <FlatList
          data={gifts}
          keyExtractor={(item) => item.id}
          renderItem={renderGift}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  giftCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  giftImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  giftInfo: {
    flex: 1,
    marginLeft: 12,
  },
  giftName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  giftPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  giftStore: {
    fontSize: 12,
    color: '#666',
  },
  recommendedBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  recommendedText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '500',
  },
  giftMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '500',
  },
  giftRating: {
    fontSize: 13,
    color: '#FF8E53',
  },
});
