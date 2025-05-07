import http from "../../shared/services/http-common.js"

export class ReservationService {
    resourceEndPoint = '/reservations';

    create(reservationResource) {
        return http.post(this.resourceEndPoint, reservationResource);
    }

    getAllReservationsByParkingId(parkingId) {
        return http.get(`${this.resourceEndPoint}/parking/${parkingId}`);
    }
}