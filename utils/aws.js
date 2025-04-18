import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import {
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';

const s3 = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.EXPO_PUBLIC_ACCESS_KEY_SECRET,
  },
});

export const uploadFile = async (uri, key) => {
    try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64
        })
        fileContent = Buffer.from(base64, 'base64');
        const command = new PutObjectCommand({
            Bucket: process.env.EXPO_PUBLIC_BUCKET_NAME,
            Key: `${key}/image.jpg`,
            Body: fileContent,
            ContentType:"image/jpg"
        })
        const data = await s3.send(command);
        return data
    } catch(error){
        console.log(error)
        return error
    }
    
    
}