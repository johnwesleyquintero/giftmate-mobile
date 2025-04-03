import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

type Gift = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  store: string;
};

const mockGifts: Gift[] = [
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
  const renderGift = ({ item }: { item: Gift }) => (
    <TouchableOpacity style={styles.giftCard}>
      <Image source={{ uri: item.image }} style={styles.giftImage} />
      <View style={styles.giftInfo}>
        <Text style={styles.giftName}>{item.name}</Text>
        <Text style={styles.giftPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.giftMeta}>
          <Text style={styles.giftStore}>{item.store}</Text>
          <Text style={styles.giftRating}>★ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockGifts}
        renderItem={renderGift}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 16,
  },
  giftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  giftImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  giftInfo: {
    padding: 16,
  },
  giftName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  giftPrice: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  giftMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  giftStore: {
    fontSize: 13,
    color: '#8E8E93',
  },
  giftRating: {
    fontSize: 13,
    color: '#FF9500',
  },
});