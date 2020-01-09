const consola = require("consola"); // Elegant Console Logger for Node.js and Browser
const { Nuxt, Builder } = require("nuxt");
const { app, server } = require("./app");

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }
  // Give nuxt middleware to express
  app.use(nuxt.render);
  // Listen the server
  server.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
  });
}
start();
