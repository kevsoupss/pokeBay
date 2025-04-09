import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />
  }
  if (permission.granted){
    return (
      <View className="justify-center">
        <Text>Permission needed</Text>
        <Button onPress={requestPermission} title="grant permissions" />
      </View>
    )
  }

  return (
    <View>
      <CameraView facing={facing}>

        <View>
          
        </View>
      </CameraView>
    </View>
  )
}

export default Camera