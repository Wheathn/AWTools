const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  return response.sendFile('index.html', { root: '.' });
});

app.get('/auth/discord', (request, response) => {
  return response.sendFile('dashboard.html', { root: '.' });
});

// New route to provide Firebase configuration
app.get('/config', (request, response) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-8FW16M9XG4"
  };
  return response.json(firebaseConfig);
});

const port = 53134;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
