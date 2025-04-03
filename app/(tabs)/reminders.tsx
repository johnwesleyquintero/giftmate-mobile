import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useState } from 'react';

export default function RemindersScreen() {
  const [notifications, setNotifications] = useState({
    events: true,
    giftSuggestions: true,
    dateIdeas: false,
    weekBefore: true,
    dayBefore: true,
    dayOf: true,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Types</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Event Reminders</Text>
          <Switch
            value={notifications.events}
            onValueChange={() => toggleSwitch('events')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Gift Suggestions</Text>
          <Switch
            value={notifications.giftSuggestions}
            onValueChange={() => toggleSwitch('giftSuggestions')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Date Ideas</Text>
          <Switch
            value={notifications.dateIdeas}
            onValueChange={() => toggleSwitch('dateIdeas')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminder Schedule</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>1 Week Before</Text>
          <Switch
            value={notifications.weekBefore}
            onValueChange={() => toggleSwitch('weekBefore')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>1 Day Before</Text>
          <Switch
            value={notifications.dayBefore}
            onValueChange={() => toggleSwitch('dayBefore')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Day Of Event</Text>
          <Switch
            value={notifications.dayOf}
            onValueChange={() => toggleSwitch('dayOf')}
            trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  optionText: {
    fontSize: 17,
  },
});