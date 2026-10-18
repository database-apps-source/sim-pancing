/** Ubah mode menjadi 'gas' setelah backend STAGING + Firebase siap dan uji CORS lulus. */
window.SIM_CONFIG = Object.freeze({
  mode: 'gas', // GANTI menjadi 'gas' HANYA setelah staging GET/POST, auth dan QA lulus.
  gasUrl: 'https://script.google.com/macros/s/AKfycbwSHySkOpLUDsEb5bLO2v2Jp5VnPuENiHyQkDIIaCOfgUqYK_6dvcimYilQ1__b4ocGig/exec',
  firebaseApiKey: 'AIzaSyBkOH31tNN7xi3PS3B06BR6jOlSw2tQ-pw', // public client config, bukan service account key
  appName: 'SIM-TOPANCING Bang Zod'
});
