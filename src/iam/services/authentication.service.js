import http from "../../shared/services/http-common.js";

export class AuthenticationService {

    signIn(signInRequest) {
        return http.post("/authentication/sign-in", signInRequest);
    }

    signUpDriver(signUpRequest) {
        return http.post("/authentication/sign-up/driver", signUpRequest);
    }

    signUpOwner(signUpRequest) {
        return http.post("/authentication/sign-up/parking-owner", signUpRequest);
    }
}