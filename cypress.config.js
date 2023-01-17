const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    timeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
