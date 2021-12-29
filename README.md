# Cypress iframe

[![GitHub license](https://img.shields.io/github/license/deepsquare-io/cypress-iframe?style=flat-square)](https://github.com/deepsquare-io/cypress-iframe/blob/main/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/deepsquare-io/cypress-iframe/Test?label=tests&logo=cypress&style=flat-square)](https://github.com/deepsquare-io/cypress-iframe/actions/workflows/test.yml)

This packages adds iframe support to [Cypress](https://www.cypress.io/).

This repository is a fork of [`cypress-iframe`](https://gitlab.com/kgroat/cypress-iframe), originally created
by [Kevin Groat](https://www.kgroat.dev/) ([kgroat](https://gitlab.com/kgroat)).

## Installation

```bash
npm install -D @deepsquare/cypress-iframe
# or
yarn add -D @deepsquare/cypress-iframe
# or
pnpm install -D @deepsquare/cypress-iframe
```

In your `cypress/support/commands.js` file, add the following:

```js
import '@deepsquare/cypress-iframe';

// or
require('@deepsquare/cypress-iframe');
```

If you're using TypeScript with cypress, and have not overridden the `types` or `typeRoots` in your tsc compiler
options, then everything should work.

If you have overridden them, or if it otherwise doesn't work out-of-the-box, you will also either want to:

1. Add `///<reference types="cypress-iframe" />` to the top of your cypress tests in which you use the commands
1. Add a `globals.d.ts` in the root of your `cypress` directory and add `///<reference types="cypress-iframe" />` to it

## Usage

You can now use the three included commands.

### `frameLoaded`

This command checks that an iframe has loaded onto the page

Example:

```js
// This will verify that the iframe is loaded to any page other than 'about:blank'
cy.frameLoaded();

// This will verify that the iframe is loaded to any url containing the given path part
cy.frameLoaded({ url: 'https://google.com' });
cy.frameLoaded({ url: '/join' });
cy.frameLoaded({ url: '?some=query' });
cy.frameLoaded({ url: '#/hash/path' });

// You can also give it a selector to check that a specific iframe has loaded
cy.frameLoaded('#my-frame');
cy.frameLoaded('#my-frame', { url: '/join' });
```

### `iframe`

This will cause subsequent commands to be executed inside of the given iframe

Example:

```js
// This will verify that the iframe is loaded to any page other than 'about:blank'
cy.iframe().find('.some-button').should('be.visible').click();
cy.iframe().contains('Some hidden element').should('not.be.visible');
cy.find('#outside-iframe').click(); // this will be executed outside the iframe

// You can also give it a selector to find elements inside of a specific iframe
cy.iframe('#my-frame').find('.some-button').should('be.visible').click();
cy.iframe('#my-second-frame').contains('Some hidden element').should('not.be.visible');
```

### `enter`

This can be used to execute a group of commands within an iframe

Example:

```js
// This will verify that the iframe is loaded to any page other than 'about:blank'
cy.enter().then((getBody) => {
  getBody().find('.some-button').should('be.visible').click();
  getBody().contains('Some hidden element').should('not.be.visible');
});

// You can also give it a selector to find elements inside of a specific iframe
cy.enter('#my-iframe').then((getBody) => {
  getBody().find('.some-button').should('be.visible').click();
  getBody().contains('Some hidden element').should('not.be.visible');
});
```

## Caveat

Cypress does not take snapshots of dom state inside of iframes. Therefore, even if you are using this library, in your
tests, when you hover over commands executed within an iframe, a placeholder will be displayed rather than the actual
contents of the iframe when the command was executed.
