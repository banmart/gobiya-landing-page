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
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/api/')) {
              console.log(`[API DEV] Intercepted ${req.method} ${req.url}`);
              
              let handlerExecuted = false;
              const runHandler = async (bodyData: string) => {
                if (handlerExecuted) return;
                handlerExecuted = true;
                
                try {
                  console.log(`[API DEV] Executing handler for ${req.url} (body length: ${bodyData.length})`);
                  // Attach parsed body to request so handler can access it
                  (req as any).body = bodyData;

                  // Dynamically load the API handler in the SSR context
                  const apiModule = await server.ssrLoadModule('/api/index.ts');
                  const handler = apiModule.default || apiModule;
                  
                  // Polyfill Vercel Response helpers
                  const vercelRes = Object.create(res);
                  vercelRes.status = (code: number) => {
                    res.statusCode = code;
                    return vercelRes;
                  };
                  vercelRes.json = (bodyObj: any) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(bodyObj));
                    return vercelRes;
                  };
                  vercelRes.send = (bodyText: any) => {
                    res.end(bodyText);
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
                  console.log(`[API DEV] Completed ${req.url} with status ${res.statusCode}`);
                } catch (err: any) {
                  console.error('[API DEV] Vite local API execution error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              };

              const hasBody = req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH';
              if (!hasBody || req.readableEnded || !req.readable) {
                const existingBody = (req as any).body || '';
                runHandler(typeof existingBody === 'string' ? existingBody : JSON.stringify(existingBody));
              } else {
                let body = '';
                req.on('data', chunk => {
                  body += chunk.toString();
                });
                req.on('end', () => {
                  runHandler(body);
                });
                // Safety timeout fallback
                setTimeout(() => {
                  if (!handlerExecuted) {
                    console.log(`[API DEV] Timeout fallback triggered for ${req.url}`);
                    runHandler(body);
                  }
                }, 2000);
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
