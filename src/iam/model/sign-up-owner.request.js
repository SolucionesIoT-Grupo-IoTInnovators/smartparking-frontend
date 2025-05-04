export class SignUpOwnerRequest {
    constructor(email, password, fullName, city, country, phone, companyName, ruc) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.companyName = companyName;
        this.ruc = ruc;
    }
}