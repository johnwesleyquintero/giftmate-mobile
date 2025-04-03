import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Plus, Gift, Calendar, Heart } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

type Event = {
  id: string;
  title: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'other';
  image?: string;
  giftIdeas?: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
  dateIdeas?: {
    id: string;
    name: string;
    image: string;
    rating: number;
  }[];
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: "Mom's Birthday",
    date: '2024-03-15',
    type: 'birthday',
    image: 'https://images.unsplash.com/photo-1557245526-45dc0f1a8745?w=400',
    giftIdeas: [
      {
        id: 'g1',
        name: 'Spa Day Package',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200'
      },
      {
        id: 'g2',
        name: 'Cooking Class',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=200'
      }
    ],
    dateIdeas: [
      {
        id: 'd1',
        name: 'Afternoon Tea',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200',
        rating: 4.8
      }
    ]
  },
  {
    id: '2',
    title: 'Wedding Anniversary',
    date: '2024-06-20',
    type: 'anniversary',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400',
    giftIdeas: [
      {
        id: 'g3',
        name: 'Couples Massage',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200'
      }
    ],
    dateIdeas: [
      {
        id: 'd2',
        name: 'Sunset Dinner Cruise',
        image: 'https://images.unsplash.com/photo-1514302240736-b1fee5985889?w=200',
        rating: 4.9
      }
    ]
  },
];

export default function EventsScreen() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const renderGiftIdea = ({ item }) => (
    <TouchableOpacity style={styles.giftIdeaCard}>
      <Image source={{ uri: item.image }} style={styles.giftIdeaImage} />
      <View style={styles.giftIdeaInfo}>
        <Text style={styles.giftIdeaName}>{item.name}</Text>
        <Text style={styles.giftIdeaPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDateIdea = ({ item }) => (
    <TouchableOpacity style={styles.dateIdeaCard}>
      <Image source={{ uri: item.image }} style={styles.dateIdeaImage} />
      <View style={styles.dateIdeaInfo}>
        <Text style={styles.dateIdeaName}>{item.name}</Text>
        <Text style={styles.dateIdeaRating}>★ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={[styles.eventCard, selectedEvent?.id === item.id && styles.eventCardSelected]}
      onPress={() => setSelectedEvent(selectedEvent?.id === item.id ? null : item)}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        
        {selectedEvent?.id === item.id && (
          <View style={styles.eventDetails}>
            {item.giftIdeas && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Gift size={20} color="#007AFF" />
                  <Text style={styles.sectionTitle}>Gift Ideas</Text>
                </View>
                <FlatList
                  data={item.giftIdeas}
                  renderItem={renderGiftIdea}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.ideasList}
                />
              </View>
            )}
            
            {item.dateIdeas && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Heart size={20} color="#007AFF" />
                  <Text style={styles.sectionTitle}>Date Ideas</Text>
                </View>
                <FlatList
                  data={item.dateIdeas}
                  renderItem={renderDateIdea}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.ideasList}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <Link href="/new-event" asChild>
        <TouchableOpacity style={styles.fab}>
          <Plus color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </Link>
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
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventCardSelected: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  eventDetails: {
    marginTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  ideasList: {
    paddingVertical: 4,
  },
  giftIdeaCard: {
    width: 160,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  giftIdeaImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  giftIdeaInfo: {
    padding: 12,
  },
  giftIdeaName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  giftIdeaPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  dateIdeaCard: {
    width: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  dateIdeaImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  dateIdeaInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateIdeaName: {
    fontSize: 15,
    fontWeight: '500',
  },
  dateIdeaRating: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});