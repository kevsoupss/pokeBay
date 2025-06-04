import { useState } from "react";
import { Button, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Card = ({json, id}) => {
  const [selectedCard, setSelectedCard] = useState(null)

  if (!json || !json.data) {
      return (
        <View className="bg-dark-200 p-4 m-2 rounded-lg">
          <Text className="text-white">Loading...</Text>
        </View>
      );
    }
  return (
    <View>
    <TouchableOpacity className="bg-dark-200 m-2 rounded-lg p-3 w-50 h-78 " onPress={() => setSelectedCard(id)}>
        <Image
            source={{
                uri: json.data.images.large,
            }}
            className="w-full h-60 rounded-lg"
            resizeMode="contain"
        />
        <Text className="text-sm font-bold text-white underline " numberOfLines={1}>
            {json.data.name}
        </Text>
        <Text className="text-sm font-bold text-white ">
            {json.data.set.name}
        </Text>
    </TouchableOpacity>
    <Modal 
      visible={!!selectedCard}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setSelectedCard(null)}
      >
        <View className="bg-dark-100 flex-1 mt-10" > 
            <View className="pl-8 pt-2 items-start"> 
              <Button title="Back" onPress={() => setSelectedCard(null)} />
            </View>
            <ScrollView className="p-5">
              <Image
              source={{
                  uri: json.data.images.large,
              }}
              className="w-full h-[400px] rounded-lg p-4"
              resizeMode="contain"
          />
          <View className="pl-5">
            <Text className="text-white font-bold text-3xl pb-3">
              {json.data.name} - {json.data.set.name}
            </Text>

            <Text className="text-gray-300 text-m pb-8">
              Release Date - {json.data.set.releaseDate}
            </Text>

            <View className="flex-row pb-6">
              <View className="flex-col pr-10">
                <Text className="text-gray-500 font-bold pb-2">
                  Market Price
                </Text>
                
                <Text className="text-white">
                  ${json.data.tcgplayer.prices.holofoil.market}
                </Text>

              </View>
              <View className="flex-col pr-10">
                <Text className="text-gray-500 font-bold pb-2">
                    Low Price
                </Text>
                <Text className="text-white">
                  ${json.data.tcgplayer.prices.holofoil.low}
                </Text>
              </View>

              <View className="flex-col pr-10 ">
                <Text className="text-gray-500 font-bold pb-2">
                    High Price
                </Text>
                <Text className="text-white">
                  ${json.data.tcgplayer.prices.holofoil.high}
                </Text>
              </View>


            </View>

              <View className="flex-col pb-6">
                  <Text className="text-gray-500 font-bold pb-2">
                      Rarity
                  </Text>
                  <Text className="text-white">
                  {json.data.rarity}
                  </Text>
              </View>

              <View className="flex-col pb-6">
                  <Text className="text-gray-500 font-bold pb-2">
                      Artist
                  </Text>
                  <Text className="text-white">
                  {json.data.artist}
                  </Text>
              </View>


          </View>
            </ScrollView>
          

        </View>
      </Modal>

    </View>

  );
};

export default Card;