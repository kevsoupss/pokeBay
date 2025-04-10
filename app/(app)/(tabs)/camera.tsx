import { images } from '@/constants/images';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null)
  const ref = useRef<CameraView>(null);

  if (!permission) {
    return <View />
  }
  if (!permission.granted){
    return (
      <View className="justify-center">
        <Text>Permission needed</Text>
        <Button onPress={requestPermission} title="Grant permissions" />
      </View>
    )
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
            height: 100, // Adjust height as needed
            backgroundColor: '#12122C', // Or any color you prefer
            zIndex: 10, // Ensure it stays on top
        }}>
        <TouchableOpacity className="flex-1 justify-end pl-4 pb-2" onPress={() => {
            setUri(null);
            router.back();
        }}>
            <Image className="justify-start items-start w-4 h-4 font-bold" source={images.returnbutton}/>
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
            height: 100, // Adjust height as needed
            backgroundColor: '#12122C', // Or any color you prefer
            zIndex: 10, // Ensure it stays on top
        }}>
        <TouchableOpacity className="flex-1 justify-end pl-4 pb-2" onPress={() => {
            setUri(null);
            router.back();
        }}>
            <Image className="justify-start items-start w-4 h-4 font-bold" source={images.returnbutton}/>
        </TouchableOpacity>
        

      </View>
      <Image
          source={{ uri }}
          style={{width: "100%", height: "70%"}}
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

            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <>

    <View className="flex-1 bg-dark-100 items-center justify-center h-full w-full">
      {uri ? renderPicture() : renderCamera()}
    </View>
    </>
  )
}

export default Camera