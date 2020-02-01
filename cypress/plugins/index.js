const path = require('path');

// use ts-node to transpile typescript plugins
require('ts-node').register({
    project: path.join(__dirname, '../../tsconfig.json')
});

const runAllPlugins = funcs => (on, originalConfig) => {
    return funcs.reduce((config, func) => {
        return func(on, config) || config;
    }, originalConfig)
};

// https://on.cypress.io/plugins-guide
module.exports = runAllPlugins([
    require('./transpileTypescript.ts'),
]);
