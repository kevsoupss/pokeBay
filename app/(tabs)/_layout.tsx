import { View, Text, TextBase, ImageBackground } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Image } from 'react-native'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

const Tab_icon = ({focused,icon,title}: any) => {
   
    
    if(focused){
        return(
            <>
            <ImageBackground source={images.buttonback} tintColor="#" className='flex flex-row flex-1 min-w-[75px] justify-center items-center gap-1'>
            <Image source = {icon} className = "size-4" tintColor="#151312"/>
            <Text>{title}</Text>
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
            tabBarStyle : {
                backgroundColor: '#231D58'

            }
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown:false,
                tabBarIcon : ({focused}:any) => (
                   <Tab_icon focused = {focused} icon = {icons.home} title = 'Home' />
                ) 
            }}
        />
        <Tabs.Screen 
            name="camera"
            options={{
                title: 'Camera',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <Tab_icon focused = {focused} icon = {icons.camera} title = 'Camera' />
                 ) 
            }}
        />
        <Tabs.Screen 
            name="cards"
            options={{
                title: 'Cards',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <Tab_icon focused = {focused} icon = {icons.card} title = 'Cards' />
                 ) 
            }}
        />
        <Tabs.Screen 
            name="shop"
            options={{
                title: 'Shop',
                headerShown:false,
                tabBarIcon : ({focused} : any) => (
                    <Tab_icon focused = {focused} icon = {icons.shop} title = 'Shop'/>
                 ) 
            }}
        />
    </Tabs>
  )
}

export default _Layout