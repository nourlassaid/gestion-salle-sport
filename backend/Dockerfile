# Étape 1 : image de base
FROM node:20-alpine

# Créer le dossier de l'app
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier tout le code
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
