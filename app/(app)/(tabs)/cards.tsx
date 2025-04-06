import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { images } from '@/constants/images'
import { Image } from 'react-native'


const Cards = () => {
 
  const cards = [{name:"Luxio",image:images.buttonback},{name:"Pikachu",image:images.buttonback},{name:"Simipour",image:images.buttonback}]
  const Global_View = ({name,image} : any) => {
    return (

      <View className='flex'>
        <Text className='text-white'>{name}</Text>
        <Image source={image}></Image>
      
      </View>

    )

   }

  
  return (
 

    <View className='flex-1 justify-center items-center bg-dark-100 p-10'>
   
      <FlatList data = {cards} renderItem= {({item}) => (
          <>
            <Global_View name = {item.name} image = {item.image}></Global_View>
            
          </>
          
      )}>
      </FlatList>

    </View>

      
 
  )
}



export default Cards