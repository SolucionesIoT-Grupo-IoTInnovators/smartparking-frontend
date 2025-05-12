import http from "../../shared/services/http-common.js";

export class ReviewService {
    resourceEndPoint = '/reviews';

    create(reviewResource) {
        return http.post(this.resourceEndPoint, reviewResource);
    }

    getAllReviewsByParkingId(parkingId) {
        return http.get(`${this.resourceEndPoint}/parking/${parkingId}`);
    }
}