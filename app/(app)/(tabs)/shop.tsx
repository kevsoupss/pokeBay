import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Text, TouchableOpacity, View } from "react-native";

// @ts-ignore
const client = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.EXPO_PUBLIC_ACCESS_KEY_SECRET,
  },
});

const command = new PutObjectCommand({
  Bucket: process.env.EXPO_PUBLIC_BUCKET_NAME,
  Key: "test",
  Body: "hi"
})

const uploadToAWS = async () => {
  try {
    const data = await client.send(command);
    console.log("Upload successful:", data);
    console.log("Uploaded successfully!");
  } catch (error) {
    console.error("Error uploading:", error);
  }
};

const Shop = () => {
  

  return (
<View style={{
          width: "100%",
          height: "100%",
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
  )
}
     
export default Shop;
