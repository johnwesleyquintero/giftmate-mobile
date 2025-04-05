import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';
import LoadingSpinner from '../components/LoadingSpinner';
import { theme } from '../theme';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.background },
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      }),
    }}
  >
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

export const RootNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullscreen />;  
  }

  return session ? <TabNavigator /> : <AuthStack />;
};
