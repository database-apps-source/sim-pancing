/** REST bridge GitHub Pages -> Google Apps Script (staging).
 * Google ContentService CORS/redirect HARUS lulus smoke test browser sebelum dipakai live.
 */
window.SimApi={
 _refreshPromise:null,
 async ensureIdToken(){
  const current=sessionStorage.getItem('simFirebaseToken')||'';
  if(!current)return '';
  const expires=Number(sessionStorage.getItem('simFirebaseExpiresAt')||0);
  if(!expires||expires-Date.now()>120000)return current;
  if(this._refreshPromise)return this._refreshPromise;
  this._refreshPromise=(async()=>{
   const key=window.SIM_CONFIG.firebaseApiKey;
   const refresh=sessionStorage.getItem('simFirebaseRefresh')||'';
   if(!refresh){this.signOut();throw Error('Sesi kedaluwarsa. Login kembali.');}
   const params=new URLSearchParams({grant_type:'refresh_token',refresh_token:refresh});
   let response,body;
   try{
    response=await fetch('https://securetoken.googleapis.com/v1/token?key='+encodeURIComponent(key),{
     method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:params.toString(),cache:'no-store'
    });
    body=await response.json();
   }catch(err){throw Error('Koneksi autentikasi terputus. Ulangi saat jaringan tersedia.');}
   if(!response.ok||!body.id_token){this.signOut();throw Error('Sesi login berakhir. Masuk kembali.');}
   sessionStorage.setItem('simFirebaseToken',body.id_token);
   sessionStorage.setItem('simFirebaseRefresh',body.refresh_token||refresh);
   sessionStorage.setItem('simFirebaseExpiresAt',String(Date.now()+Number(body.expires_in||3600)*1000));
   return body.id_token;
  })();
  try{return await this._refreshPromise;}finally{this._refreshPromise=null;}
 },
 async request(action,data={},reqId=''){
  if(window.SIM_CONFIG.mode==='demo')return await Promise.resolve().then(()=>window.DemoAPI.request(action,data,reqId));
  if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(window.SIM_CONFIG.gasUrl))throw Error('Isi URL GAS /exec yang valid di js/config.js');
  const publicRead=action==='catalog'||action==='health';
  const idToken=publicRead?'':await this.ensureIdToken();
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),25000);
  try{
   const url=publicRead?window.SIM_CONFIG.gasUrl+'?action='+encodeURIComponent(action):window.SIM_CONFIG.gasUrl;
   const options=publicRead?{method:'GET',redirect:'follow',cache:'no-store',signal:ctrl.signal}:{method:'POST',redirect:'follow',cache:'no-store',signal:ctrl.signal,headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,idToken,data,reqId})};
   const res=await fetch(url,options);
   if(!res.ok)throw Error('HTTP '+res.status);
   let payload;try{payload=await res.json();}catch(_){throw Error('API bukan JSON: periksa deployment GAS dan redirect CORS.');}
   if(!payload.ok)throw Error(payload.message||payload.error||'API gagal');return payload.data;
  }catch(err){if(err.name==='AbortError')throw Error('Server timeout. Periksa status transaksi sebelum mengulang.');throw err;}finally{clearTimeout(timer);}
 },
 async signIn(email,password){
  if(window.SIM_CONFIG.mode==='demo'){sessionStorage.setItem('simrole',email);return {email,role:email};}
  const key=window.SIM_CONFIG.firebaseApiKey;
  if(!key||key.startsWith('PASTE_'))throw Error('Isi firebaseApiKey di js/config.js');
  const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+encodeURIComponent(key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,returnSecureToken:true})});
  const obj=await response.json();if(!response.ok)throw Error(obj.error?.message||'Login gagal');
  const verifyResp=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='+encodeURIComponent(key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:obj.idToken})});
  const verifyData=await verifyResp.json();
  if(!verifyResp.ok)throw Error('Tidak dapat memverifikasi sesi Firebase');
  if(!verifyData.users?.[0]?.emailVerified){
   await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+encodeURIComponent(key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestType:'VERIFY_EMAIL',idToken:obj.idToken})});
   throw Error('Email belum terverifikasi. Cek email verifikasi, lalu login kembali.');
  }
  sessionStorage.setItem('simFirebaseToken',obj.idToken);
  sessionStorage.setItem('simFirebaseRefresh',obj.refreshToken);
  sessionStorage.setItem('simFirebaseExpiresAt',String(Date.now()+Number(obj.expiresIn||3600)*1000));
  return obj;
 },
 signOut(){['simFirebaseToken','simFirebaseRefresh','simFirebaseExpiresAt','simrole'].forEach(k=>sessionStorage.removeItem(k));}
};
