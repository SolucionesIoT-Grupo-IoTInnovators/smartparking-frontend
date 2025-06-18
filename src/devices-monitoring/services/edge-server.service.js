import http from "../../shared/services/http-common.js";

export class EdgeServerService {
    resourceEndPoint = '/edge-servers';

    getEdgeServersByParkingId(parkingId) {
        return http.get(`${this.resourceEndPoint}/parking/${parkingId}`);
    }
}