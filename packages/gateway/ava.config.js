export default {
  nonSemVerExperiments: {
    configurableModuleFormat: true,
  },
  files: ['test/*.spec.js'],
  timeout: '5m',
  nodeArguments: ['--experimental-vm-modules'],
}
