import { images } from "@/constants/images";
import { Image, Text, View } from "react-native";


export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-dark-100"
    >
      <Text className="text-5xl text-white">PokeBay</Text>
      <Image source={images.logo} />
    </View>
  );
}
