import { ParcelsProvider } from './index';

export class NCOneMapParcels implements ParcelsProvider {
  async getParcel(lat: number, lng: number) {
    if (process.argv.includes('--offline')) {
      return { id: 'parcel-123', owner: 'John Doe', acreage: 1.5, geom: {} };
    }
    // Actual implementation would query ArcGIS REST API with geometry intersection
    // e.g. /arcgis/rest/services/Parcels/MapServer/0/query?geometryType=esriGeometryPoint&geometry={lng},{lat}
    return { id: 'mock-live-parcel', owner: 'Live Owner', acreage: 2.0, geom: {} };
  }
}
