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

export const getCards = async (userId) => {
    try {
        const URL = process.env.EXPO_PUBLIC_API_URL + `/userCards?personId=${userId}`

        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch(error){
        console.log(error)
        return error
    }
}

export const analyzeCards = async (userId) => {
    const URL = process.env.EXPO_PUBLIC_API_URL + `/analyze-image?personId=${userId}`
      try {
        console.log("Attempting to fetch:", URL);
        const result = await fetch(URL, {
          method: "POST",
        });
        console.log("Response status:", result.status);
        console.log("Response headers:", result.headers);
        const data = await result.json()
        return data.cards
    } catch (error) {
      console.log("Error name:", error.name);
      console.log("Error message:", error.message);
      console.log("Error stack:", error.stack);
    }
}
