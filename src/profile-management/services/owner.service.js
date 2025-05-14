import http from "../../shared/services/http-common.js";

export class OwnerService {
    resourceEndPoint = '/profiles/parking-owner'

    getParkingOwnerById(userId) {
        return http.get(`${this.resourceEndPoint}/${userId}`);
    }
}