import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../hooks/useAuth';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export const RootNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return null; // Or loading spinner
  }

  return session ? <TabNavigator /> : <AuthStack />;
};