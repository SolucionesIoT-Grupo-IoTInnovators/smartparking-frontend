import http from "../../shared/services/http-common.js";

export class ParkingService {
    resourceEndPoint = '/parkings';

    create(parkingResource) {
        return http.post(this.resourceEndPoint, parkingResource);
    }

    addParkingSpot(parkingId, parkingSpotResource) {
        return http.post(`${this.resourceEndPoint}/${parkingId}/spots`, parkingSpotResource);
    }

    getAllParkingSpotsByParkingId(parkingId) {
        return http.get(`${this.resourceEndPoint}/${parkingId}/spots`);
    }
}