export function getEdgeState() {
    if (typeof document === 'undefined') {
        return {}; // static export
    }
    const stateEl = document.querySelector('script#edge_state');
    if (!stateEl) {
        return {};
    }
    try {
        const { user } = JSON.parse(stateEl.innerText);
        return {
            user,
            tokens: Object.keys(user.tokens).map((k) => ({
                name: k,
                token: user.tokens[k]
            }))
        };
    } catch (err) {
        console.error('failed to parse state JSON', stateEl.innerText, err);
        return {};
    }
}
