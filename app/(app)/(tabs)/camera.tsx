import { images } from '@/constants/images';
import auth from '@react-native-firebase/auth';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Card from "../../../components/Card";
import { analyzeCards, uploadFile } from "../../../utils/aws";

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [cards, setCards] = useState<string[]| null> (null);
  const [data, setData] = useState<{[key: string]: any}>({})
  const ref = useRef<CameraView>(null);

  useEffect(() => {
    async function fetchAllDetails() {
      const results: Record<string, any> = {};
      for (const item of cards) {
        console.log(item)
        const res = await fetch(`https://api.pokemontcg.io/v2/cards/${item}`);
        const json = await res.json();
        results[item] = json;
      }
      setData(results);
      console.log(results)
    }
    fetchAllDetails();
  }, [cards]);

  const user = auth().currentUser;
  const userId = user?.uid;

  if (!permission) {
    return <View />
  }
  if (!permission.granted){
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Camera Permission needed</Text>
        <Button onPress={requestPermission} title="Grant permissions" />
      </View>
    )
  }

  const removeCard = (id: string) => {
    setCards(prev => prev ? prev.filter(cardId => cardId !== id) : prev);

    setData(prevData => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
  }

  const getCards = async () => {
    if (uri){
      console.log(uri)
      const data = await uploadFile(uri, userId);
      console.log(data);
      const URL = process.env.EXPO_PUBLIC_API_URL + `/analyze-image?personId=${userId}`
      try {
        const cards = await analyzeCards(userId)
        console.log(cards)
        setCards(cards)

      } catch (error) {
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
      }
    }
  }
  
  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setUri(photo.uri);
      console.log('New URI:', photo.uri);
    } else {
      console.warn('No URI returned from camera');
    }
  };

  const renderCamera = () => {
    return (
      <View style={{width: "100%", height: "100%"   }}>
        <View style={{ 
            height: 100, 
            backgroundColor: '#12122C', 
            zIndex: 10, 
        }}>
        <TouchableOpacity className="flex-1 justify-end pl-4 pb-2" onPress={() => {
            setUri(null);
            router.back();
        }}>
            <Image className="justify-start items-start w-6 h-6 font-bold" source={images.returnbutton}/>
        </TouchableOpacity>
        

      </View>
        <CameraView
          ref={ref}
          style={{width: "100%", height: "70%", borderRadius: 40}}
          ratio="16:9"
          className="overflow-hidden rounded-3xl flex-1"
        />
        
        <View style={{
          width: "100%",
          height: "20%",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#12122C',
        }}>
          <TouchableOpacity className="pb-10"

            onPress={() => takePicture()}
          >
            <Image className="w-24 h-24" source={images.camerabutton} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderPicture = () => {
    return (
        <View style={{width: "100%", height: "100%"   }}>
        <View style={{ 
            height: 100, 
            backgroundColor: '#12122C', 
            zIndex: 10,
        }} 
        className="flex-row justify-center items-end">
        <TouchableOpacity className="pl-4 pb-2" onPress={() => {
            setUri(null);
            router.back();
        }}>
            <Image className="w-6 h-6 font-bold" source={images.returnbutton}/>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-end pr-4 pb-2" onPress={() => {
            setUri(null);
        }}>
            <Image className="w-6 h-6 font-bold" source={images.cross}/>
        </TouchableOpacity>
        
      </View>

      {/* @ts-ignore */}
      <Image source={{ uri }}
          style={{width: "100%", height: "70%"}}
        />

        
        <View style={{
          width: "100%",
          height: "20%",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#12122C',
        }}>

        <TouchableOpacity onPress={() => {
           getCards()
        }} 
          className="bg-dark-200 border-white w-1/2 h-14 items-center justify-center rounded-[50px] border-[1px] mb-20"> 
          <Text className="text-white font-bold text-xl"> Confirm</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderCards = () => {
    return (
      <ScrollView className='flex-1 bg-dark-100 p-4 mt-20 w-full'>
          <TouchableOpacity className="pl-4 pb-2 items-start" onPress={() => {
            setUri(null);
            setCards(null)
        }}>

          <Image className="w-6 h-6 font-bold" source={images.returnbutton}/>
          <Text className="text-white">Retake</Text>


        </TouchableOpacity>
      <Text className="text-white text-2xl font-bold text-center">
        Detected Cards ({cards!.length})
      </Text>
      <Text className="text-white text-m text-center mb-6">
        Click cards to see more 
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {cards!.map((item) => (
          
          <View key={item} className="w-[50%] mb-4">
                  <TouchableOpacity className="pl-4 pb-2" onPress={() => {
                    removeCard(item)
                }}>
            <Image className="w-6 h-6 font-bold" source={images.cross}/>
        </TouchableOpacity>
            <Card json={data[item]} id={item} />
          </View>
        ))}
      </View>
      </ScrollView>

      
    )
  }


  return (
    <>
    <View className="flex-1 bg-dark-100 items-center justify-center h-full w-full">
      {cards ? renderCards() : (uri ? renderPicture() : renderCamera()) }
    </View>
    </>
  )
}

export default Camera