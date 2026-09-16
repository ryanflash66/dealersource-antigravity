import { DriveTimeProvider } from './index';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export class OpenRouteService implements DriveTimeProvider {
  async getDriveMinutes(lat: number, lng: number, homeBaseStr: string) {
    if (process.argv.includes('--offline')) return 45;
    
    const key = process.env.OPENROUTESERVICE_KEY;
    if (!key || key === 'placeholder') return 45; // Fallback to mock if no key

    // Need to geocode homeBaseStr in real implementation, assuming mock for now
    // fetch /v2/matrix/driving-car
    return 45; 
  }
}
