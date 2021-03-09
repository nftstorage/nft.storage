import { cookieKey, stores } from './constants';

export function hydrateState(state = {}) {
    return {
        /**
         *
         * @param {HTMLHeadElement} head
         */
        element: (head) => {
            const jsonState = JSON.stringify(state);
            const scriptTag = `<script id="edge_state" type="application/json">${jsonState}</script>`;
            head.append(scriptTag, { html: true });
        }
    };
}

/**
 * Decode JWT
 *
 * @param {string} token
 * @returns
 */
export function decodeJWT(token) {
    var output = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }

    const result = atob(output);

    try {
        return decodeURIComponent(escape(result));
    } catch (err) {
        console.log(err);
        return result;
    }
}

/**
 * CSRF protection - generate state
 * @returns {Promise<string>}
 */
export async function generateStateParam() {
    const resp = await fetch('https://csprng.xyz/v1/api');
    const { Data: state } = await resp.json();
    await stores.csrf.put(`state-${state}`, 'true', { expirationTtl: 86400 });
    return state;
}

/**
 * Logout headers
 *
 * @param {FetchEvent} event
 * @returns
 */
 export const logout = (event) => {
    const cookieHeader = event.request.headers.get('Cookie');
    if (cookieHeader && cookieHeader.includes(cookieKey)) {
        return {
            headers: {
                'Set-cookie': `${cookieKey}=""; HttpOnly; Secure; SameSite=Lax;`
            }
        };
    }
    return {};
};

