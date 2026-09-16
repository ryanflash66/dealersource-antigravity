import { FloodProvider } from './index';

export class FemaFlood implements FloodProvider {
  async getFloodZone(lat: number, lng: number) {
    if (process.argv.includes('--offline')) return ['X']; // Offline mock: outside high risk
    return ['X']; // Live mock: ArcGIS REST query
  }
}
