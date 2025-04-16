import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: Express) {
  // Proxy API requests to the local Vercel dev server during development
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4501',
      changeOrigin: true,
    })
  );
};
