const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/plannings/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Upload multiple images
router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  const paths = req.files.map(file => `/uploads/plannings/${file.filename}`);
  res.status(200).json({ message: 'Images enregistrées', images: paths });
});

// Récupérer la liste des images
router.get('/images', (req, res) => {
  const folderPath = path.join(__dirname, '../uploads/plannings');
  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Erreur lecture' });
    const imagePaths = files.map(file => `/uploads/plannings/${file}`);
    res.json(imagePaths);
  });
});

module.exports = router;
