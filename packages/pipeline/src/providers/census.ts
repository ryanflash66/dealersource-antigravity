import { GeocoderProvider } from './index';

export class CensusGeocoder implements GeocoderProvider {
  async geocode(address: string) {
    if (process.argv.includes('--offline')) {
      return { lat: 35.6127, lng: -77.3664, canonicalAddress: address };
    }
    const url = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}&benchmark=Public_AR_Current&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.result.addressMatches.length > 0) {
      const match = data.result.addressMatches[0];
      return {
        lat: match.coordinates.y,
        lng: match.coordinates.x,
        canonicalAddress: match.matchedAddress
      };
    }
    return null;
  }
}
