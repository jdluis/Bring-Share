import { View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const NavBar = () => {
    return (
        <View className="flex flex-row justify-around w-full mt-4 ">
            <Link className=" text-lg rounded-2xl bg-blue-300 p-2" href="/Auth/login">Enter Code</Link>
            <Link className=" text-lg rounded-2xl bg-blue-300 p-2" href="/Auth">Sign In/Login</Link>
            <Link className=" text-lg rounded-2xl bg-blue-300 p-2" href="/">Home</Link>
        </View>
    )
}

export default NavBar
