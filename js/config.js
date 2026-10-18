/** Ubah mode menjadi 'gas' setelah backend STAGING + Firebase siap dan uji CORS lulus. */
window.SIM_CONFIG = Object.freeze({
  mode: 'demo', // GANTI menjadi 'gas' HANYA setelah staging GET/POST, auth dan QA lulus.
  gasUrl: 'https://script.google.com/macros/s/AKfycbwSHySkOpLUDsEb5bLO2v2Jp5VnPuENiHyQkDIIaCOfgUqYK_6dvcimYilQ1__b4ocGig/exec',
  firebaseApiKey: 'PASTE_FIREBASE_WEB_API_KEY_HERE', // public client config, bukan service account key
  appName: 'SIM-TOPANCING Bang Zod'
});
