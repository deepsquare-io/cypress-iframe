import webpackConfigFn from '../../webpack.config'
const wp = require('@cypress/webpack-preprocessor')

namespace Cypress {
  export interface Actions {
    (type: 'file:preprocessor', other: any): void
    (type: 'task', other: any): void
  }
}

// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config
module.exports = (on: Cypress.Actions) => {
  const options = { webpackOptions: webpackConfigFn() }

  // https://docs.cypress.io/api/plugins/preprocessors-api.html#Usage
  on('file:preprocessor', wp(options))
}
