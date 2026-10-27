import {
  getHomeHeroSlidesOrDefaults,
  HOME_HERO_SLIDES_KEY,
} from "./home-hero-slides";
import { getMongoDb } from "./mongodb";

export async function getHomeHeroSlides() {
  try {
    const database = await getMongoDb();
    const content = await database
      .collection("siteContent")
      .findOne({ key: HOME_HERO_SLIDES_KEY });
    return getHomeHeroSlidesOrDefaults(content?.data);
  } catch (error) {
    if (!(error instanceof Error && /MONGODB_URI|not reachable/.test(error.message))) {
      console.error("Homepage slide read from MongoDB failed:", error);
    }
    return getHomeHeroSlidesOrDefaults(undefined);
  }
}
