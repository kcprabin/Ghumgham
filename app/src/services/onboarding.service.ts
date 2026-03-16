import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ENDPOINTS_CONTENT } from "@/src/constants/api";
import {
  ONBOARDING_SLIDES,
  type OnboardingSlide,
} from "@/src/constants/screens/onboarding";

const ONBOARDING_CACHE_KEY = "onboarding_slides_v1";

const isValidSlide = (slide: any): slide is OnboardingSlide => {
  return (
    slide &&
    typeof slide.id === "string" &&
    typeof slide.title === "string" &&
    typeof slide.subtitle === "string" &&
    typeof slide.imageUrl === "string" &&
    typeof slide.status === "boolean"
  );
};

const parseSlides = (raw: any): OnboardingSlide[] => {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isValidSlide);
};

export async function getOnboardingSlides(): Promise<OnboardingSlide[]> {
  try {
    const response = await axios.get(API_ENDPOINTS_CONTENT.ONBOARDING, {
      timeout: 5000,
      withCredentials: true,
    });

    const data = response.data?.data || response.data;
    const remoteSlides = parseSlides(data?.slides || data);

    if (remoteSlides.length > 0) {
      await AsyncStorage.setItem(ONBOARDING_CACHE_KEY, JSON.stringify(remoteSlides));
      return remoteSlides;
    }
  } catch {
    // Fall through to cache/defaults.
  }

  try {
    const cached = await AsyncStorage.getItem(ONBOARDING_CACHE_KEY);
    if (cached) {
      const cachedSlides = parseSlides(JSON.parse(cached));
      if (cachedSlides.length > 0) {
        return cachedSlides;
      }
    }
  } catch {
    // Ignore cache parse failures.
  }

  return ONBOARDING_SLIDES;
}
