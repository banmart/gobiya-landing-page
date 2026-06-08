import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/')) {
              try {
                // Dynamically load the API handler in the SSR context
                const apiModule = await server.ssrLoadModule('/api/index.ts');
                const handler = apiModule.default || apiModule;
                
                // Polyfill Vercel Response helpers
                const vercelRes = Object.create(res);
                vercelRes.status = (code: number) => {
                  res.statusCode = code;
                  return vercelRes;
                };
                vercelRes.json = (body: any) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(body));
                  return vercelRes;
                };
                vercelRes.send = (body: any) => {
                  res.end(body);
                  return vercelRes;
                };
                vercelRes.setHeader = (name: string, value: string) => {
                  res.setHeader(name, value);
                  return vercelRes;
                };
                vercelRes.writeHead = (code: number, headers?: any) => {
                  res.writeHead(code, headers);
                  return vercelRes;
                };

                await handler(req, vercelRes);
              } catch (err: any) {
                console.error('Vite local API execution error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: 2000,
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    ssr: {
      noExternal: ['gsap'],
    },
  };
});
