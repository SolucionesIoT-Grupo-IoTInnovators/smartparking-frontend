export class Review {
    constructor({
                    id = 0,
                    driverId = 0,
                    driverName = '',
                    parkingId = 0,
                    parkingName = '',
                    comment = '',
                    rating = 0,
                    createdAt = ''
                }) {
        this.id = id;
        this.driverId = driverId;
        this.driverName = driverName;
        this.parkingId = parkingId;
        this.parkingName = parkingName;
        this.comment = comment;
        this.rating = rating;
        this.createdAt = createdAt;
    }
}