# 🚀 Deployment Guide - VZW De Speelkamer

## Belangrijk: CMS Deployment

⚠️ **Let op**: De CMS heeft een **backend server** nodig die draait. GitHub Pages ondersteunt alleen statische bestanden, dus de CMS backend moet op een aparte server draaien.

## Deployment Opties

### Optie 1: Statische Website op GitHub Pages + CMS op Externe Server (Aanbevolen)

#### A. Website Deployen naar GitHub Pages

1. **Push naar GitHub:**
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

2. **GitHub Pages Activeren:**
   - Ga naar je repository op GitHub
   - Klik op **Settings**
   - Scroll naar **Pages**
   - Bij **Source** selecteer **main branch**
   - Klik **Save**
   - Je website is nu live op: `https://[username].github.io/VZW-de-speelkamer/`

#### B. CMS Backend Deployen

De CMS backend moet op een Node.js server draaien. Opties:

**1. Heroku (Gratis tier beschikbaar):**

```bash
# Installeer Heroku CLI
# Ga naar cms folder
cd cms

# Login bij Heroku
heroku login

# Maak nieuwe app
heroku create vzw-speelkamer-cms

# Deploy
git init
git add .
git commit -m "Deploy CMS"
heroku git:remote -a vzw-speelkamer-cms
git push heroku main

# Stel environment variabelen in
heroku config:set JWT_SECRET=jouw-super-geheime-sleutel
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=jouw-veilig-wachtwoord
```

**2. Railway.app (Eenvoudig en gratis):**

1. Ga naar [railway.app](https://railway.app)
2. Klik "Start a New Project"
3. Selecteer "Deploy from GitHub repo"
4. Kies je repository en selecteer de `/cms` folder
5. Railway detecteert automatisch Node.js
6. Voeg environment variabelen toe in Settings:
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `PORT` (Railway stelt dit automatisch in)

**3. Render.com (Gratis tier):**

1. Ga naar [render.com](https://render.com)
2. Klik "New +" → "Web Service"
3. Connect je GitHub repository
4. Configuratie:
   - **Root Directory**: `cms`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Voeg environment variabelen toe

#### C. CMS URL Updaten

Na deployment van de CMS backend, update de API URL in de website:

**Bestand: `cms/public/js/config.js`**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/api'
    : 'https://jouw-cms-url.herokuapp.com/api'; // Vervang met je echte CMS URL
```

### Optie 2: Alles op Eigen Server/VPS

Als je een eigen server hebt (bijv. via een hosting provider):

1. **Upload alle bestanden** naar je server
2. **Installeer Node.js** op de server
3. **Configureer de CMS:**
```bash
cd cms
npm install
cp .env.example .env
# Edit .env met je productie waarden
npm start
```

4. **Configureer een reverse proxy** (nginx of Apache) om:
   - De website te serveren op `https://jouwdomein.be/`
   - De CMS te serveren op `https://jouwdomein.be/cms/`

**Nginx voorbeeld configuratie:**
```nginx
server {
    listen 80;
    server_name jouwdomein.be;

    # Website (statische bestanden)
    location / {
        root /pad/naar/vzw-de-speelkamer;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # CMS Static files
    location /cms/ {
        alias /pad/naar/vzw-de-speelkamer/cms/public/;
        try_files $uri $uri/ /cms/index.html;
    }

    # CMS API
    location /cms/api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Gebruik PM2** om de CMS server draaiende te houden:
```bash
npm install -g pm2
cd cms
pm2 start server.js --name "vzw-cms"
pm2 save
pm2 startup
```

### Optie 3: Netlify (Alleen voor statische website)

⚠️ **Let op**: Netlify kan alleen de statische website hosten, niet de CMS backend.

1. **Netlify CLI installeren:**
```bash
npm install -g netlify-cli
```

2. **Deployen:**
```bash
netlify deploy --prod
```

3. **CMS backend moet nog steeds op een aparte server** (zie Optie 1B)

## Post-Deployment Checklist

### ✅ Beveiliging

- [ ] Wijzig `JWT_SECRET` naar een sterke random string (min. 32 karakters)
- [ ] Wijzig admin wachtwoord via CMS interface
- [ ] Configureer CORS correct in `cms/server.js`:
```javascript
app.use(cors({
    origin: 'https://jouwdomein.be', // Je productie URL
    credentials: true
}));
```
- [ ] Gebruik HTTPS (niet HTTP)
- [ ] Backup `cms/database/db.json` regelmatig

### ✅ Configuratie

- [ ] Update API URL in `cms/public/js/config.js`
- [ ] Update CMS link in footers (indien nodig)
- [ ] Test alle CMS functies (login, CRUD operaties)
- [ ] Test image uploads

### ✅ Performance

- [ ] Comprimeer afbeeldingen
- [ ] Minify CSS/JS (optioneel)
- [ ] Configureer caching headers

## Database Backups

**Automatische backup script** (voeg toe aan cron job):

```bash
#!/bin/bash
# backup-cms.sh
DATE=$(date +%Y%m%d_%H%M%S)
cp /pad/naar/cms/database/db.json /pad/naar/backups/db_$DATE.json

# Houd alleen laatste 30 backups
cd /pad/naar/backups
ls -t db_*.json | tail -n +31 | xargs rm -f
```

Voeg toe aan crontab (dagelijks om 2:00):
```bash
crontab -e
# Voeg toe:
0 2 * * * /pad/naar/backup-cms.sh
```

## Troubleshooting

### CMS laadt niet
- Check of de backend server draait
- Controleer API URL in browser console (F12)
- Verifieer CORS instellingen

### Login werkt niet
- Check environment variabelen
- Verifieer dat database bestaat
- Check browser console voor errors

### Image uploads falen
- Controleer schrijfrechten op `/images` folder
- Verifieer dat folder bestaat
- Check file size limits

### API errors
- Check server logs: `pm2 logs vzw-cms`
- Verifieer database integriteit
- Check network tab in browser

## Monitoring

**Aanbevolen tools:**
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Analytics**: Google Analytics, Plausible

## Support

Voor vragen of problemen:
1. Check de logs: `pm2 logs` of Heroku logs
2. Verifieer configuratie in `.env`
3. Test API endpoints met Postman
4. Check browser console (F12)

## Kosten Overzicht

| Service | Prijs | Geschikt voor |
|---------|-------|---------------|
| GitHub Pages | Gratis | Statische website |
| Heroku | Gratis tier beschikbaar | CMS backend |
| Railway.app | $5/maand (gratis trial) | CMS backend |
| Render.com | Gratis tier beschikbaar | CMS backend |
| Netlify | Gratis | Statische website |
| Eigen VPS | €5-20/maand | Alles |

## Aanbevolen Setup voor Kleine Budgetten

1. **Website**: GitHub Pages (gratis)
2. **CMS Backend**: Railway.app of Render.com (gratis tier)
3. **Domain**: Cloudflare (gratis SSL)

**Totale kosten**: €0-5/maand

---

**Succes met de deployment!** 🚀
