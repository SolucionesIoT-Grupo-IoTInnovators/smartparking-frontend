import {useAuthenticationStore} from "./authentication.store.js";

export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    if (!authenticationStore.isSignedIn) {
        authenticationStore.checkSavedSession();
    }
    const isAnonymous = !authenticationStore.isSignedIn;
    //const publicRoutes = ['/sign-in', '/sign-up', '/about', '/page-not-found'];
    const publicRoutes = ['/sign-in'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);
    if (isAnonymous && routeRequiresToBeAuthenticated) return next({name: 'sign-in'});
    else next();
}