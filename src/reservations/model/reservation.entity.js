export class Reservation {
    constructor({
                    id = 0,
                    driverId = 0,
                    vehiclePlate = '',
                    parkingId = 0,
                    parkingSpotId = '',
                    date = '',
                    startTime = '',
                    endTime = '',
                    totalPrice = 0,
                    status = '',
                }) {
        this.id = id;
        this.driverId = driverId;
        this.vehiclePlate = vehiclePlate;
        this.parkingId = parkingId;
        this.parkingSpotId = parkingSpotId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalPrice = totalPrice;
        this.status = status;
    }
}