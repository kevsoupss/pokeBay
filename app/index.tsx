import { images } from '@/constants/images';
import auth from "@react-native-firebase/auth";
import { Link } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn =  async () => {
    setLoading(true);
    try {
        const res = await auth().signInWithEmailAndPassword(email,password);
        alert('Success')
    } catch(e: any) {
        const err = e as FirebaseError;
        alert('Registration failed ' + err.message);
    } finally {
        setLoading(false);
    }
  }
  return (
    <View className="flex-1 items-center bg-dark-100 pt-[80px]">
      <Text className="text-white text-6xl my-7">
        PokeBay
      </Text>
      <Image source={images.logo} className="w-20 h-20"/>
      <Text className="text-white py-10 text-2xl"> Log in to see your collection</Text>
      <KeyboardAvoidingView behavior="padding" className="w-screen items-center gap-6">
        <TextInput 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={"grey"}
          className="bg-white h-10 w-3/4 rounded-3xl pl-4"
        />
        <TextInput 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={"grey"}
          className="bg-white h-10 w-3/4 rounded-3xl pl-4 "
        />
        
        { loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
      
        <TouchableOpacity onPress={signIn} 
          className="bg-dark-200 border-white w-1/2 h-14 items-center justify-center rounded-[50px] border-[1px]"> 
          <Text className="text-white font-bold text-xl"> Login</Text>
        </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
      <View className="flex-1 pt-8 flex-row">
        <Text className="text-white">Don't have an account?</Text>
          <Link href={"signup" as any} asChild>
            <Pressable>
              <Text className="text-[#1978C1] pl-1">Sign Up</Text>
            </Pressable>
          </Link>
      </View>

      

    </View>
  )
}

export default index