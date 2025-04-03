import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Calendar, MapPin, Gift } from 'lucide-react-native';

type Interest = {
  id: string;
  name: string;
  icon: string;
};

const interests: Interest[] = [
  { id: '1', name: 'Technology', icon: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100' },
  { id: '2', name: 'Fashion', icon: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100' },
  { id: '3', name: 'Sports', icon: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100' },
  { id: '4', name: 'Books', icon: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100' },
  { id: '5', name: 'Music', icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100' },
  { id: '6', name: 'Food', icon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100' },
];

export default function NewEventScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'birthday' | 'anniversary' | 'other'>('birthday');
  const [location, setLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('');

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // TODO: Implement event creation logic
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event title"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputWithIcon}>
            <Calendar size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIconField}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location (Optional)</Text>
          <View style={styles.inputWithIcon}>
            <MapPin size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIconField}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gift Budget (Optional)</Text>
          <View style={styles.inputWithIcon}>
            <Gift size={20} color="#8E8E93" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIconField}
              value={budget}
              onChangeText={setBudget}
              placeholder="Enter budget"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Type</Text>
          <View style={styles.typeButtons}>
            {(['birthday', 'anniversary', 'other'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, type === t && styles.typeButtonActive]}
                onPress={() => setType(t)}>
                <Text
                  style={[styles.typeButtonText, type === t && styles.typeButtonTextActive]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Interests</Text>
          <Text style={styles.subtitle}>Select interests for better gift recommendations</Text>
          <View style={styles.interestsGrid}>
            {interests.map(interest => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestButton,
                  selectedInterests.includes(interest.id) && styles.interestButtonActive
                ]}
                onPress={() => toggleInterest(interest.id)}
              >
                <Image source={{ uri: interest.icon }} style={styles.interestIcon} />
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest.id) && styles.interestTextActive
                  ]}
                >
                  {interest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    padding: 12,
    fontSize: 17,
    backgroundColor: '#F8F8F8',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
  },
  inputIcon: {
    marginLeft: 12,
  },
  inputWithIconField: {
    flex: 1,
    padding: 12,
    fontSize: 17,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    color: '#8E8E93',
    fontSize: 15,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestButton: {
    width: '30%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  interestButtonActive: {
    backgroundColor: '#E1F0FF',
  },
  interestIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },
  interestTextActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});