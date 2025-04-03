import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const NewEventScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileExtension = uri.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(fileName, blob);

    if (error) {
      throw error;
    }

    return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-images/${data.path}`;
  };

  const createEvent = async () => {
    setLoading(true);
    try {
      if (!title || !date || !time) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const { error } = await supabase.from('events').insert({
        title,
        description,
        date: date.toISOString(),
        time: time.toISOString(),
        location,
        image_url: imageUrl,
      });

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Event created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Event Title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Event Description"
        multiline
      />

      <Text style={styles.label}>Date *</Text>
      <Button 
  title={date.toLocaleDateString()} 
  onPress={() => setShowDatePicker(true)}
  color="#FF6B8B"
/>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Time *</Text>
      <Button 
  title={time.toLocaleTimeString()} 
  onPress={() => setShowTimePicker(true)}
  color="#FF6B8B"
/>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Event Location"
      />

      <Text style={styles.label}>Image</Text>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <Button 
  title="Pick an image" 
  onPress={pickImage}
  color="#FF6B8B"
/>

      <Button 
        title="Create Event" 
        onPress={createEvent} 
        disabled={loading}
        color="#FF6B8B"
      />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB', // Off White
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#8E8E93', // Gray
  },
  input: {
    borderWidth: 1,
    borderColor: '#C6C6C8', // Light Gray
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6B8B', // Pink
  },
});

export default NewEventScreen;
styles.button = { backgroundColor: '#FF6B8B' };