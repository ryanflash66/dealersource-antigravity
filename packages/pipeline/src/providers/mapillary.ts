import { ImageryProvider } from './index';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export class MapillaryImagery implements ImageryProvider {
  async getImageryUrls(lat: number, lng: number) {
    if (process.argv.includes('--offline')) return ['https://placeholder.com/image.jpg'];
    const key = process.env.MAPILLARY_TOKEN;
    if (!key || key === 'placeholder') return ['https://placeholder.com/image.jpg'];
    return ['https://placeholder.com/image.jpg']; // Live mock
  }
}
