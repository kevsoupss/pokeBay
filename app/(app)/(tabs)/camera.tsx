import { images } from '@/constants/images';
import AWS from 'aws-sdk';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';

AWS.config.update({

  
})
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
  
  const uploadToAWS = () => {
    console.log(uri, "uploaded")
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
           uploadToAWS()
        }} 
          className="bg-dark-200 border-white w-1/2 h-14 items-center justify-center rounded-[50px] border-[1px] mb-20"> 
          <Text className="text-white font-bold text-xl"> Confirm</Text>
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