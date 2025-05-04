export class SignUpDriverRequest {
    constructor(email, password, fullName, city, country, phone, dni) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.dni = dni;
    }
}