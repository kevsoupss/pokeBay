import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown:false
            }}
        />
        <Tabs.Screen 
            name="camera"
            options={{
                title: 'Camera',
                headerShown:false
            }}
        />
        <Tabs.Screen 
            name="cards"
            options={{
                title: 'Cards',
                headerShown:false
            }}
        />
        <Tabs.Screen 
            name="shop"
            options={{
                title: 'Shop',
                headerShown:false
            }}
        />
    </Tabs>
  )
}

export default _Layout