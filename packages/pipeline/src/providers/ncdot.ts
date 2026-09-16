import { TrafficProvider } from './index';

export class NcdotTraffic implements TrafficProvider {
  async getAADT(lat: number, lng: number) {
    if (process.argv.includes('--offline')) return 15000;
    return 15000; // Live mock
  }
}
