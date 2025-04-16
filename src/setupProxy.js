const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy API requests to the local Vercel dev server during development
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4501',
      changeOrigin: true,
    })
  );
};
