import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RemindersScreen() {
  const { session } = useAuth();
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [notifications, setNotifications] = useState({
    events: true,
    giftSuggestions: true,
    dateIdeas: false,
    weekBefore: true,
    dayBefore: true,
    dayOf: true,
  });

  useEffect(() => {
    (async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      setNotificationPermission(existingStatus === 'granted');

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationPermission(status === 'granted');
      }

      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        setCalendarPermission(status === 'granted');
      }
    })();
  }, []);

  const scheduleNotification = async (event: any) => {
    if (!notificationPermission) return;

    const triggers = {
      weekBefore: notifications.weekBefore ? 7 : null,
      dayBefore: notifications.dayBefore ? 1 : null,
      dayOf: notifications.dayOf ? 0 : null,
    };

    Object.entries(triggers).forEach(async ([key, days]) => {
      if (days === null) return;

      const triggerDate = new Date(event.date);
      triggerDate.setDate(triggerDate.getDate() - days);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Upcoming: ${event.title}`,
          body: `Don't forget about ${event.title} ${days > 0 ? `in ${days} days` : 'today'}!`,
          data: { eventId: event.id },
        },
        trigger: triggerDate,
      });
    });
  };

  const syncWithCalendar = async (event: any) => {
    if (!calendarPermission) return;

    try {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find(
        (calendar) => calendar.isPrimary && calendar.allowsModifications,
      );

      if (!defaultCalendar) return;

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: event.title,
        startDate: new Date(event.date),
        endDate: new Date(event.date),
        allDay: true,
        alarms: [{ relativeOffset: -1440 }], // 1 day before
      });
    } catch (error) {
      console.error('Error syncing with calendar:', error);
    }
  };

  const toggleSwitch = async (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    if (!session?.user) return;

    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) throw error;

      if (key === 'events' && events) {
        events.forEach(async (event) => {
          if (!prev[key]) {
            await scheduleNotification(event);
            await syncWithCalendar(event);
          } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
          }
        });
      }

      await supabase.from('user_preferences').upsert({
        user_id: session.user.id,
        notifications: notifications,
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      Alert.alert('Error', 'Failed to update notification preferences');
    }
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
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Gift Suggestions</Text>
          <Switch
            value={notifications.giftSuggestions}
            onValueChange={() => toggleSwitch('giftSuggestions')}
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Date Ideas</Text>
          <Switch
            value={notifications.dateIdeas}
            onValueChange={() => toggleSwitch('dateIdeas')}
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
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
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>1 Day Before</Text>
          <Switch
            value={notifications.dayBefore}
            onValueChange={() => toggleSwitch('dayBefore')}
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Day Of Event</Text>
          <Switch
            value={notifications.dayOf}
            onValueChange={() => toggleSwitch('dayOf')}
            trackColor={{ false: '#D1D1D6', true: '#FF6B8B' }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
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
