import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text } from 'react-native'

const TabIcon = ({focused,icon,title}: any) => {
   
    if (focused){
        return (
            <>
            <ImageBackground 
                source={images.buttonback} 
                tintColor="#" 
                className='flex flex-row flex-1 min-w-[112px] min-h-12 rounded-full justify-center items-center overflow-hidden mt-2'>
                <Image source = {icon} className = "size-4" tintColor="#151312"/>
                <Text className="text-base font-semibold pl-2">{title}</Text>
            </ImageBackground>
            </>
            
        )
    }
    else{
        return(<Image source = {icon} className = "size-5"/> )
    }

    
    }
const _Layout = () => {
  return (
    <Tabs
        screenOptions = {{
            tabBarShowLabel : false,
            tabBarItemStyle: {
                width:'100%',
                justifyContent:'center',
                alignItems: 'center'
            },
           
            tabBarStyle : {
                backgroundColor: '#231D58',
                borderTopWidth : 0,
                height: 85,

            }
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown:false,
                tabBarIcon : ({focused}:any) => (
                   <TabIcon focused = {focused} icon = {icons.home} title = 'Home' />
                ) 
            }}
        />
        <Tabs.Screen 
            name="camera"
            options={{
                title: 'Camera',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <TabIcon focused = {focused} icon = {icons.camera} title = 'Camera' />
                 ) 
            }}
        />
        <Tabs.Screen 
            name="cards"
            options={{
                title: 'Cards',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <TabIcon focused = {focused} icon = {icons.card} title = 'Cards' />
                 ) 
            }}
        />
        <Tabs.Screen 
            name="shop"
            options={{
                title: 'Shop',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <TabIcon focused = {focused} icon = {icons.shop} title = 'Shop'/>
                 ) 
            }}
        />
    </Tabs>
  )
}

export default _Layout