import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import '../globals.css';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    console.log(user, initializing)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {

    if (initializing) {
      return;
    }

    const inAppGroup = segments[0] === '(app)';
    if (user && !inAppGroup) {
      console.log('Attempting redirect to /(app)/(tabs)');
      router.replace('/(app)/(tabs)');
    } else if (!user && inAppGroup) {
      console.log('Attempting redirect to / from', segments);
      router.replace('/(auth)/signin');
    }
  }, [user, initializing, segments])

  return <Stack >
      <Stack.Screen  
        name="signin"
        options={{headerShown: false}}
      />
      <Stack.Screen  
        name="signup"
        options={{headerShown: false}}
      />

    </ Stack>;
}
