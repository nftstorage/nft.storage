export function findNs(namespaces, env, name) {
  const prefix = env === 'production' ? '' : `-${env}-`
  const suffix = env === 'production' ? '' : '_preview'
  const fqn = `nft-storage${prefix}${name}${suffix}`
  const ns = namespaces.find((ns) => ns.title === fqn)
  if (!ns) throw new Error(`KV namespace ${fqn} not found`)
  return ns
}
