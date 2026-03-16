import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import OnboardingScreen from "@/src/components/onboarding/onboarding-screen";
import {
  ONBOARDING_SLIDES,
  type OnboardingSlide,
} from "@/src/constants/screens/onboarding";
import { getOnboardingSlides } from "@/src/services/onboarding.service";

interface OnboardingFlowScreenProps {
  step: number;
}

export default function OnboardingFlowScreen({ step }: OnboardingFlowScreenProps) {
  const router = useRouter();
  const [slides, setSlides] = useState<OnboardingSlide[]>(ONBOARDING_SLIDES);

  useEffect(() => {
    let isMounted = true;

    const loadSlides = async () => {
      const remoteSlides = await getOnboardingSlides();
      if (isMounted && remoteSlides.length > 0) {
        setSlides(remoteSlides);
      }
    };

    loadSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentIndex = useMemo(() => {
    const safeMax = Math.max(0, slides.length - 1);
    return Math.min(Math.max(step, 0), safeMax);
  }, [slides.length, step]);

  const currentSlide = slides[currentIndex] || ONBOARDING_SLIDES[currentIndex] || ONBOARDING_SLIDES[0];
  const isLast = currentIndex >= slides.length - 1;

  const handleSkip = () => {
    router.replace("/(auth)/signin" as any);
  };

  const handleNext = async () => {
    if (isLast) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/(auth)/signin" as any);
      return;
    }

    if (currentIndex === 0) {
      router.push("/(onboarding)/onboarding2" as any);
      return;
    }

    router.push("/(onboarding)/onboarding3" as any);
  };

  return (
    <OnboardingScreen
      slide={currentSlide}
      current={currentIndex}
      total={slides.length}
      isLast={isLast}
      onSkip={handleSkip}
      onNext={handleNext}
    />
  );
}
