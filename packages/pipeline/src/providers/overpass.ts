import { CompetitorsProvider } from './index';

export class OverpassCompetitors implements CompetitorsProvider {
  async getCompetitors(lat: number, lng: number, radiusKm: number) {
    if (process.argv.includes('--offline')) return 2;
    return 2; // Live mock
  }
}
