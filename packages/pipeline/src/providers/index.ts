export interface GeocoderProvider {
  geocode(address: string): Promise<{ lat: number; lng: number; canonicalAddress: string } | null>;
}

export interface ParcelsProvider {
  getParcel(lat: number, lng: number): Promise<{ id: string; owner: string; acreage: number; geom: any } | null>;
}

export interface ZoningProvider {
  getZoning(lat: number, lng: number): Promise<{ district: string; useTableUrl?: string } | null>;
}

export interface DriveTimeProvider {
  getDriveMinutes(lat: number, lng: number, homeBaseStr: string): Promise<number | null>;
}

export interface TrafficProvider {
  getAADT(lat: number, lng: number): Promise<number | null>;
}

export interface FloodProvider {
  getFloodZone(lat: number, lng: number): Promise<string[]>;
}

export interface ImageryProvider {
  getImageryUrls(lat: number, lng: number): Promise<string[]>;
}

export interface CompetitorsProvider {
  getCompetitors(lat: number, lng: number, radiusKm: number): Promise<number>;
}
