export const environment = {
  production: false,
  // PUBLIC_INTERFACE
  // The base URL for API requests. This tries multiple environment variables:
  // NG_APP_API_BASE or NG_APP_BACKEND_URL. If neither is set, the app will fallback
  // to loading mock data from /assets/recipes.json.
  apiBaseUrl:
    (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_API_BASE) ||
    (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_BACKEND_URL) ||
    '',
  // PUBLIC_INTERFACE
  // Whether to enable source maps and other dev aids; controlled via NG_APP_ENABLE_SOURCE_MAPS
  enableSourceMaps:
    (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_ENABLE_SOURCE_MAPS) === 'true',
  // PUBLIC_INTERFACE
  // Port hint for local development preview systems
  port:
    (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_PORT) || '3000'
};
