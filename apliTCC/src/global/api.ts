// const WEB_API = "http://localhost:3000/api"; TIRE O COMENTÁRIO PARA USAR NA WEB
const ANDROID_EMULATOR_API = "http://10.0.2.2:3000/api";

export function getApiUrl() {
  if (typeof window !== "undefined") {
    // return WEB_API; // ESTE TAMBEM
  }
  return ANDROID_EMULATOR_API;
}

console.log("API URL:", getApiUrl());