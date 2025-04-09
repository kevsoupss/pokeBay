import { images } from "@/constants/images";
import auth from '@react-native-firebase/auth';
import { Button, Image, Text, View } from "react-native";


export default function Index() {
  const user = auth().currentUser;
  const username = user?.displayName;
  return (
    <View className="flex-1 justify-top items-center bg-dark-100 pt-32"
    >
      <Image source={images.logo} className="w-20 h-20"/>
      <Text className="text-5xl text-white p-5 font-bold" >Welcome back {username}!</Text>
      
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}
