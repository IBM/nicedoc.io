'use strict'

module.exports = () => {
  return {
    name: 'nicedoc',
    use: 'node',
    // Optional: setup IBM Cloud Target
    // associated with your project.
    ibmcloud: {
      resourceGroup: 'RIS2-ETX',
      region: 'us-south',
      organization: 'RIS2-ETX',
      space: 'Nicedoc'
    },
    // Optional: setup Docker images
    // container registry to be used.
    docker: {
      registry: 'us.icr.io/dploy-etx'
    }
  }
}
