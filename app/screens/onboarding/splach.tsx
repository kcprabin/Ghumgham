import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

const Splash = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Ghumgham</Text>
        <Text style={styles.subtitle}>Your travel solutions</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
})

export default Splash