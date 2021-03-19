export function getEdgeState() {
  if (typeof document === 'undefined') {
    return {} // static export
  }
  const stateEl = document.querySelector('script#edge_state')
  if (!stateEl) {
    return {}
  }
  try {
    return JSON.parse(stateEl.innerText)
  } catch (err) {
    console.error('failed to parse state JSON', stateEl.innerText, err)
    return {}
  }
}
