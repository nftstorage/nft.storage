const stores = {
    auth: SESSION,
    csrf: CSRF,
    users: USERS
}
const auth0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackUrl: AUTH0_CALLBACK_URL
};
const cookieKey = 'AUTH0-AUTH';

export {
    auth0,
    cookieKey,
    stores
}