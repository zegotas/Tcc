
# 📱💻 Projeto Fullstack - React Native + Node.js + MongoDB + JSON Server

Este projeto é dividido em três partes:

    Frontend: Aplicação mobile utilizando React Native.

    Backend: API em Node.js com integração com MongoDB.

    Banco de Dados Local (JSON Server): Simula um banco anuncios interno do aplicativo.

O Banco de dados é o MongoDB ATLAS, logo, completamente WEB
## Instruções de Instalação e Execução


### |Abra um Terminal|
 

```bash
  cd backend
  npm install
  node index.js
```
 ### |Abra outro Terminal|

 ##### | Agora para o banco de Dados Interno |

```bash
 cd frontend
 npx json-server db.json
```
### |Abra outro Terminal|
```bash
  cd frontend
  npm install 
  cd expo start -c
```

 #### Dentro do menu expo
```bash
  Aperta S (mudar para o expo go)
  Aperta A (abrir o programa ou no seu celular android)
```

No total, abrimos 3 terminais. Um com cada função para o app funcionar.

## PASSO IMPORTANTE!

Você deve alterar o IP fixo abaixo para o IP local da sua máquina (o mesmo IP que o emulador Android usa para acessar o servidor).

Dentro da pasta do FRONTEND, ache a seguinte pasta:
FRONTEND\src\global\api.ts

```bash
// ======== PADRÃO: FUNCIONA NO EMULADOR ANDROID ========
const ANDROID_EMULATOR_API = "http://192.168.2.162:3001/api"; // ⬅️ ALTERE ESTE IP
const MOCK_EMULATOR = "http://192.168.2.162:3000";             // ⬅️ ALTERE ESTE IP

export function getApiUrl() {
  // Sempre retorna o backend para o emulador Android
  return ANDROID_EMULATOR_API;
}

export function getMockApiUrl() {
  // Sempre retorna o mock para o emulador Android
  return MOCK_EMULATOR;
}

console.log("API URL:", getApiUrl());
console.log("MOCK API URL:", getMockApiUrl());
```

Alternativa para uso no navegador (Web)
Se quiser rodar o frontend no navegador (por exemplo com Expo Web), descomente a sessão abaixo:

```bash
  // const WEB_API = "http://localhost:3001/api";
// const MOCK_WEB = "http://localhost:3000";

// export function getApiUrl() {
//   if (typeof window !== "undefined") return WEB_API;
//   return ANDROID_EMULATOR_API;
// }

// export function getMockApiUrl() {
//   if (typeof window !== "undefined") return MOCK_WEB;
//   return MOCK_EMULATOR;
// }
```

```bash
 
 ipconfig    # no Windows
 ifconfig    # no Linux/macOS


```


## 📁 Estrutura do Projeto
```bash
projeto/
├── backend/ # API Node.js + MongoDB
│ └── index.js
├── frontend/ # Aplicação React Native
│ ├── App.js
│ ├── api.ts # Configuração de URLs de API
│ └── db.json # Banco de dados mockado (JSON Server)

```
## Contribuidores

| Nome       | GitHub                                   | Responsabilidade                            |
|------------|-------------------------------------------|----------------------------------------------|
| **Lucas**  | [@zegotas](https://github.com/zegotas)  | Frontend (React Native & criação de funções)                      |
| **Marcos** | [@Daniel16bit](https://github.com/DanielAndLeinad)| Backend, revisão de bugs, revisão funções            |
| **Flaviane** | [@flavianea59](Github.com/flavianea59)| Documentação                                 |


