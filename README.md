
# AI Platform Frontend

Un'applicazione web moderna per interagire con agenti AI, costruita con React, TypeScript e Tailwind CSS.

## Panoramica del progetto

Questa applicazione fornisce un'interfaccia utente per interagire con diversi agenti AI, organizzati in pacchetti di abbonamento. Gli utenti possono registrarsi, accedere e interagire con gli agenti disponibili in base al loro piano di abbonamento.

### Funzionalità principali

- **Autenticazione**: Registrazione e login utenti
- **Dashboard**: Interfaccia centralizzata per l'interazione con gli agenti
- **Chat in tempo reale**: Comunicazione con gli agenti AI con risposte in streaming
- **Gestione pacchetti**: Visualizzazione e sottoscrizione di diversi piani
- **Tema chiaro/scuro**: Supporto per modalità chiara e scura

## Struttura del progetto

```
src/
├── components/           # Componenti UI riutilizzabili
├── contexts/            # Context per la gestione dello stato
├── layouts/             # Layout condivisi tra le pagine
├── pages/               # Componenti pagina
├── services/            # Servizi per le API
└── types/               # Definizioni dei tipi TypeScript
```

## Tecnologie utilizzate

- **React**: Libreria UI
- **TypeScript**: Supporto tipizzazione
- **React Router**: Navigazione
- **TailwindCSS**: Styling
- **ShadCN UI**: Componenti UI
- **React Query**: Gestione query API
- **Context API**: Gestione stato

## Istruzioni per lo sviluppo

### Prerequisiti

- Node.js (v16 o superiore)
- npm o yarn

### Installazione

1. Clona il repository

```bash
git clone <repository-url>
cd ai-platform-frontend
```

2. Installa le dipendenze

```bash
npm install
# oppure
yarn install
```

3. Avvia il server di sviluppo

```bash
npm run dev
# oppure
yarn dev
```

L'applicazione sarà disponibile all'indirizzo http://localhost:8080.

### Variabili d'ambiente

Crea un file `.env.local` nella root del progetto con le seguenti variabili:

```
VITE_API_URL=http://localhost:8000
```

## Backend

Questo progetto è configurato per funzionare con un backend separato. Per istruzioni dettagliate sul setup del backend, consulta la documentazione nella cartella `ai_service/`.

### Connessione al backend

Se il backend è in esecuzione su un indirizzo diverso da `http://localhost:8000`, aggiorna la variabile `VITE_API_URL` nel file `.env.local`.

## Modalità standalone

L'applicazione può funzionare anche in modalità standalone, senza un vero backend. In questo caso, vengono utilizzate API mockate per simulare le interazioni con il server. Questa modalità è attiva quando la variabile `VITE_API_URL` non è definita.

## Deployment

### Build per produzione

```bash
npm run build
# oppure
yarn build
```

I file di build saranno disponibili nella cartella `dist/`.

### Docker

Per creare un'immagine Docker dell'applicazione:

```bash
docker build -t ai-platform-frontend .
```

Per eseguire il container:

```bash
docker run -p 80:80 ai-platform-frontend
```

## Note aggiuntive

- L'applicazione utilizza JWT per l'autenticazione, memorizzati in localStorage
- Il tema dell'utente viene salvato in localStorage
- Per lo sviluppo locale, l'API è configurata con CORS per accettare richieste da localhost:8080

## Licenza

MIT
