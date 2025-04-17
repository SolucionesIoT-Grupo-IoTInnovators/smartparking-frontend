export class Parking {
    constructor({
        id = 0,
        ownerId = 0,
        name = '',
        description = '',
        address = '',
        lat = 0,
        lng = 0,
        ratePerHour = 0,
        rating = 0,
        totalSpots = 0,
        availableSpots = 0,
        totalRows = 0,
        totalColumns = 0,
        imageUrl = '',
    }) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.ratePerHour = ratePerHour;
        this.rating = rating;
        this.totalSpots = totalSpots;
        this.availableSpots = availableSpots;
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        this.imageUrl = imageUrl;
    }
}