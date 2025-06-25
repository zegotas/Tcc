// api.ts - Centraliza as URLs de APIs do backend (Express) e do mock (json-server)

// ======== DESCOMENTE ESTA SESSÃO PARA FUNCIONAR NO NAVEGADOR (WEB) ========
// const WEB_API = "http://localhost:3001/api";
// const MOCK_WEB = "http://localhost:3000";
// export function getApiUrl() {
//   // Prioriza web
//   if (typeof window !== "undefined") return WEB_API;
//   return ANDROID_EMULATOR_API;
// }
// export function getMockApiUrl() {
//   if (typeof window !== "undefined") return MOCK_WEB;
//   return MOCK_EMULATOR;
// }
// ===========================================================================

// ======== PADRÃO: FUNCIONA NO EMULADOR ANDROID ========
const ANDROID_EMULATOR_API = "http://10.0.2.2:3001/api";
const MOCK_EMULATOR = "http://10.0.2.2:3000";

export function getApiUrl() {
  // Sempre retorna o backend para o emulador Android
  return ANDROID_EMULATOR_API;
}

export function getMockApiUrl() {
  // Sempre retorna o mock para o emulador Android
  return MOCK_EMULATOR;
}
// =====================================================

console.log("API URL:", getApiUrl());
console.log("MOCK API URL:", getMockApiUrl());