// app/_layout.tsx
import { useEffect, useState } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkState()
  }, [])

  async function checkState() {
    const token = await AsyncStorage.getItem('token')
    const onboarded = await AsyncStorage.getItem('hasOnboarded')

    setIsLoggedIn(!!token)
    setHasOnboarded(!!onboarded)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) return

    if (isLoggedIn) {
      router.replace('/(app)/home')        // already logged in → skip everything
    } else if (hasOnboarded) {
      router.replace('/(auth)/login')      // seen onboarding → go to login
    } else {
      router.replace('/(onboarding)/slide1') // fresh install → onboarding
    }
  }, [isLoading, isLoggedIn, hasOnboarded])

  return <Slot />
}