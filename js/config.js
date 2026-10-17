/* PUBLIC frontend configuration. Never store GAS secrets or Firebase Admin credentials here.
 * Change PREVIEW_MODE=false only after Worker + Firebase + GAS are configured.
 */
window.APP_CONFIG = {
  PREVIEW_MODE: true,
  API_GATEWAY_URL: 'https://YOUR-WORKER.workers.dev/api',
  FIREBASE: {
    apiKey: 'FIREBASE_WEB_API_KEY',
    authDomain: 'YOUR-PROJECT.firebaseapp.com',
    projectId: 'YOUR-PROJECT',
    appId: 'FIREBASE_APP_ID'
  }
};
