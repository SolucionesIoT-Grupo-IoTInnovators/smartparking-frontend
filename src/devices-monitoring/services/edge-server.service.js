import http from "../../shared/services/http-common.js";

export class EdgeServerService {
    resourceEndPoint = '/edge-servers';

    getEdgeServersByParkingId(parkingId) {
        return http.get(`${this.resourceEndPoint}/parking/${parkingId}`);
    }

    createEdgeServer(edgeServer) {
        return http.post(this.resourceEndPoint, edgeServer);
    }

    updateEdgeServerMacAddress(edgeServerId, macAddress) {
        return http.patch(`${this.resourceEndPoint}/${edgeServerId}?macAddress=${macAddress}`);
    }
}