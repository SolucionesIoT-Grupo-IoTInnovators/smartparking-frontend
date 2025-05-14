export class Owner {
    constructor({
        userId = 0,
        parkingOwnerId = 0,
        fullName = '',
        city = '',
        country = '',
        phone = '',
        companyName = '',
        ruc = '',
                }) {
        this.userId = userId;
        this.parkingOwnerId = parkingOwnerId;
        this.fullName = fullName;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.companyName = companyName;
        this.ruc = ruc;
    }
}