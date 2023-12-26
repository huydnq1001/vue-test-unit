import { createApp } from "vue";
import { expect } from "chai";
import sinon from "sinon";

// Create a Vue app instance
const app = createApp({});

// Set up Sinon sandbox
const sandbox = sinon.createSandbox();

// Add global properties and methods to the app instance
app.config.globalProperties.$expect = expect;
app.config.globalProperties.$sandbox = sandbox;

// Mount the app to a DOM element
const mountApp = (el: Element) => {
  app.mount(el);
};

export { app, sandbox, mountApp };
