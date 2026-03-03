// app/index.tsx
import { useEffect } from 'react'
import { View, Image } from 'react-native'
import { useRouter } from 'expo-router'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Root layout handles where to go, this just shows the logo
      // Actually root layout redirects AWAY from here automatically
      router.replace('/')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/logo.png')} />
    </View>
  )
}