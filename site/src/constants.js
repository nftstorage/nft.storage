
// let AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, SALT
const stores = {
    auth: SESSION,
    csrf: CSRF,
    users: USERS
}
const auth0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackUrl: AUTH0_CALLBACK_URL,
    salt: SALT
};
const cookieKey = 'AUTH0-AUTH';

const isDebug = DEBUG === 'true'

export {
    auth0,
    cookieKey,
    stores,
    isDebug
}