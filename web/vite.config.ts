import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const nodeVersion = process.version;

  // Build CSP header
  const apiUrl = env.API_URL_EU1;
  const searXngUrl = env.SEARXNG_URL_EU1;

  const cspHeader = [
    "default-src 'self'",
    `connect-src 'self' ${apiUrl} ${searXngUrl}`,
    "script-src 'self' 'unsafe-inline'", // Add 'nonce-...' or hashes in prod if possible
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  return {
    server: {
      port: Number.parseInt(env.PORT, 10),
      // Example security headers, set in nginx for prod
      headers: {
        // 'strict-transport-security': 'max-age=31536000; includeSubDomains', // 1 year
        'content-security-policy': cspHeader,
        // 'x-content-type-options': 'nosniff',
        // 'x-frame-options': 'SAMEORIGIN',
        // 'x-xss-protection': '0',
        // 'referrer-policy': 'strict-origin-when-cross-origin',
        // 'permissions-policy':
        //   'geolocation=(self), camera=(), microphone=(), fullscreen=(self), interest-cohort=()',
        // 'cross-origin-opener-policy': 'same-origin',
        // 'cross-origin-resource-policy': 'same-origin',
        // 'cache-control': 'no-cache, no-store, must-revalidate',
      },
    },

    preview: {
      port: Number.parseInt(env.PORT, 10),
    },

    plugins: [reactRouter()],

    // Fix tabler icons...
    resolve: {
      tsconfigPaths: true,
      alias: {
        // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    },

    // Scss stuff
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true,
          loadPaths: [path.join(__dirname, 'src/styles')],
        },
      },
    },

    // Fix too large files on build
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes("node_modules/.pnpm")) {
    //           return id
    //             .toString()
    //             .split("node_modules/.pnpm/")[1]
    //             .split("/")[0]
    //             .toString();
    //         }
    //       },
    //     },
    //   },
    // },

    // ENV variables
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),

      'process.env.HOST': JSON.stringify(env.HOST),
      'process.env.SEARXNG_URL_EU1': JSON.stringify(env.SEARXNG_URL_EU1),
      // "process.env.SEARXNG_URL_US1": JSON.stringify(env.SEARXNG_URL_EU1),
      'process.env.API_URL_EU1': JSON.stringify(env.API_URL_EU1),
      // "process.env.API_URL_US1": JSON.stringify(env.API_URL_EU1),
      'process.env.PV_URL_EU1': JSON.stringify(env.PV_URL_EU1),
      'process.env.WORKER_URL': JSON.stringify(env.WORKER_URL),
      'process.env.NOMINATIM_URL': JSON.stringify(env.NOMINATIM_URL),
      'process.env.IS_SELF_HOST': JSON.stringify(env.IS_SELF_HOST),
      'process.env.APP_NAME': JSON.stringify(env.APP_NAME),
      'process.env.SEARXNG_URL_SELF_HOST': JSON.stringify(env.SEARXNG_URL_SELF_HOST),
      'process.env.API_URL_SELF_HOST': JSON.stringify(env.API_URL_SELF_HOST),

      // Support stuff
      'process.env.HAS_SUPPORT': JSON.stringify(env.HAS_SUPPORT),
      'process.env.ADDRESS_BITCOIN': JSON.stringify(env.ADDRESS_BITCOIN),
      'process.env.ADDRESS_BITCOIN_CASH': JSON.stringify(env.ADDRESS_BITCOIN_CASH),
      'process.env.ADDRESS_ETHEREUM': JSON.stringify(env.ADDRESS_ETHEREUM),
      'process.env.ADDRESS_MONERO': JSON.stringify(env.ADDRESS_MONERO),
      'process.env.ADDRESS_LITECOIN': JSON.stringify(env.ADDRESS_LITECOIN),
      'process.env.ADDRESS_SOLANA': JSON.stringify(env.ADDRESS_SOLANA),

      // Platform specific
      'process.env.VERCEL_REGION': JSON.stringify(env?.VERCEL_REGION || ''),
      'process.env.FLY_APP_NAME': JSON.stringify(env?.FLY_APP_NAME || ''),
      'process.env.FLY_REGION': JSON.stringify(env?.FLY_REGION || ''),
      'process.env.FLY_MACHINE_ID': JSON.stringify(env?.FLY_MACHINE_ID || ''),

      'process.env.NODE_VERSION': JSON.stringify(nodeVersion),
    },
  };
});
