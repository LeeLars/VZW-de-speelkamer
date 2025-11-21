# 🚀 GitHub Pages + CMS Setup Guide

## Overzicht

Deze guide laat zien hoe je de website op GitHub Pages zet **met een werkende CMS** in productie.

## 📋 Wat Je Nodig Hebt

1. GitHub account (heb je al ✅)
2. Railway.app account (gratis) OF Heroku account
3. 10 minuten tijd

## 🎯 Architectuur

```
GitHub Pages (Website)  →  Railway/Heroku (CMS Backend)  →  Database
     ↓                              ↓                            ↓
Statische HTML/CSS/JS        Node.js + Express              JSON Database
```

## 📝 Stap-voor-Stap Instructies

### **Optie 1: Railway.app (Aanbevolen - Eenvoudigst)**

#### **Stap 1: Railway Account**
1. Ga naar [railway.app](https://railway.app)
2. Klik "Login" → "Login with GitHub"
3. Autoriseer Railway

#### **Stap 2: Deploy CMS**
1. Klik "New Project"
2. Selecteer "Deploy from GitHub repo"
3. Kies je repository: `VZW-de-speelkamer`
4. Railway detecteert automatisch Node.js ✅

#### **Stap 3: Configureer Root Directory**
1. Klik op je deployment
2. Ga naar "Settings"
3. Scroll naar "Root Directory"
4. Vul in: `cms`
5. Klik "Save"

#### **Stap 4: Environment Variables**
1. Ga naar "Variables" tab
2. Voeg toe:
   ```
   JWT_SECRET=jouw-super-geheime-sleutel-min-32-karakters
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=jouw-veilig-wachtwoord
   NODE_ENV=production
   ```
3. Klik "Add" voor elke variabele

#### **Stap 5: Deploy**
1. Railway deploy automatisch
2. Wacht tot "Success" ✅
3. Klik "Generate Domain" voor een publieke URL
4. Kopieer de URL (bijv: `vzw-cms.up.railway.app`)

#### **Stap 6: Update Website**
1. Open `js/data.js` in je editor
2. Zoek regel 7:
   ```javascript
   const PRODUCTION_CMS_URL = null;
   ```
3. Wijzig naar:
   ```javascript
   const PRODUCTION_CMS_URL = 'https://vzw-cms.up.railway.app/api';
   ```
4. Save bestand

#### **Stap 7: Update CORS**
1. Open `cms/server.js`
2. Zoek de CORS configuratie (rond regel 15):
   ```javascript
   app.use(cors());
   ```
3. Wijzig naar:
   ```javascript
   app.use(cors({
       origin: 'https://leelars.github.io',
       credentials: true
   }));
   ```
4. Save bestand

#### **Stap 8: Commit & Push**
```bash
git add .
git commit -m "Configure production CMS"
git push origin main
```

Railway deploy automatisch opnieuw! ✅

#### **Stap 9: Test CMS**
1. Open je Railway URL: `https://vzw-cms.up.railway.app`
2. Login met je credentials
3. Voeg test data toe
4. Klik "Opslaan"

#### **Stap 10: Test Website**
1. Open GitHub Pages: `https://leelars.github.io/VZW-de-speelkamer/`
2. Open browser console (F12)
3. Refresh pagina
4. Zie: "✅ Activities loaded from CMS"
5. **Je CMS data verschijnt!** 🎉

---

### **Optie 2: Heroku (Klassiek)**

#### **Stap 1: Heroku Account**
1. Ga naar [heroku.com](https://heroku.com)
2. Maak gratis account
3. Installeer [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### **Stap 2: Login**
```bash
heroku login
```

#### **Stap 3: Maak App**
```bash
cd cms
heroku create vzw-speelkamer-cms
```

#### **Stap 4: Environment Variables**
```bash
heroku config:set JWT_SECRET=jouw-super-geheime-sleutel
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=jouw-veilig-wachtwoord
heroku config:set NODE_ENV=production
```

#### **Stap 5: Deploy**
```bash
git init
git add .
git commit -m "Initial CMS deploy"
heroku git:remote -a vzw-speelkamer-cms
git push heroku main
```

#### **Stap 6: Test**
```bash
heroku open
```

#### **Stap 7-10: Zelfde als Railway** (zie boven)

---

### **Optie 3: Render.com (Ook Gratis)**

#### **Stap 1: Render Account**
1. Ga naar [render.com](https://render.com)
2. "Get Started" → "Sign Up with GitHub"

#### **Stap 2: New Web Service**
1. Dashboard → "New +" → "Web Service"
2. Connect repository: `VZW-de-speelkamer`
3. Configuratie:
   - **Name**: `vzw-cms`
   - **Root Directory**: `cms`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### **Stap 3: Environment Variables**
Voeg toe in "Environment" sectie:
```
JWT_SECRET=jouw-geheime-sleutel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-wachtwoord
NODE_ENV=production
```

#### **Stap 4: Create Web Service**
Render deploy automatisch!

#### **Stap 5-10: Zelfde als Railway** (zie boven)

---

## 🔒 Beveiliging Checklist

Na deployment:

- [ ] Wijzig admin wachtwoord via CMS interface
- [ ] Gebruik sterke JWT_SECRET (min. 32 karakters)
- [ ] CORS ingesteld op juiste domain
- [ ] HTTPS actief (automatisch bij Railway/Heroku/Render)
- [ ] Backup database regelmatig

## 📊 Kosten Overzicht

| Service | Gratis Tier | Kosten |
|---------|-------------|--------|
| **GitHub Pages** | ✅ Ja | €0 |
| **Railway.app** | ✅ Ja ($5 credit/maand) | €0-5 |
| **Heroku** | ✅ Ja (eco dynos) | €0-7 |
| **Render.com** | ✅ Ja | €0 |

**Totaal: €0-7 per maand**

## 🧪 Testen

### **Test 1: CMS Bereikbaar**
```bash
curl https://jouw-cms-url.up.railway.app/api/activities
```
Verwacht: JSON met activities

### **Test 2: Website Haalt Data**
1. Open GitHub Pages
2. F12 → Console
3. Zie: "✅ Activities loaded from CMS"

### **Test 3: CMS Login**
1. Open CMS URL
2. Login met credentials
3. Voeg test kamp toe
4. Refresh website
5. Nieuw kamp verschijnt! ✅

## 🐛 Troubleshooting

### **"Using fallback data" op GitHub Pages**

**Probleem:** Website gebruikt fallback ipv CMS data.

**Oplossing:**
1. Check `PRODUCTION_CMS_URL` in `js/data.js`
2. Verifieer CMS URL werkt: open in browser
3. Check CORS in `cms/server.js`
4. Check browser console voor errors

### **CORS Error**

**Probleem:** `Access-Control-Allow-Origin` error.

**Oplossing:**
Update `cms/server.js`:
```javascript
app.use(cors({
    origin: [
        'https://leelars.github.io',
        'http://localhost:8000'
    ],
    credentials: true
}));
```

Commit en push → Railway/Heroku deploy automatisch.

### **CMS Laadt Niet**

**Probleem:** CMS URL geeft 404 of error.

**Oplossing:**
1. Check Railway/Heroku logs
2. Verifieer environment variables
3. Check of `cms/` folder correct is als root directory
4. Verifieer `Procfile` bestaat

### **Database Leeg**

**Probleem:** CMS heeft geen data.

**Oplossing:**
1. Login in CMS
2. Voeg handmatig data toe
3. Of: Upload `db.json` via Railway/Heroku CLI

## 📦 Database Backup

### **Backup Maken (Railway)**
```bash
# Download database
railway run cat database/db.json > backup.json
```

### **Restore (Railway)**
```bash
# Upload database
railway run "cat > database/db.json" < backup.json
```

## 🔄 Updates Deployen

### **Automatisch (Railway/Render)**
```bash
git add .
git commit -m "Update"
git push origin main
```
Railway/Render detecteert push en deploy automatisch! ✅

### **Handmatig (Heroku)**
```bash
cd cms
git push heroku main
```

## 📝 Snelle Referentie

### **URLs**
- **Website**: `https://leelars.github.io/VZW-de-speelkamer/`
- **CMS**: `https://jouw-cms.up.railway.app`
- **API**: `https://jouw-cms.up.railway.app/api`

### **Bestanden om aan te passen**
1. `js/data.js` → `PRODUCTION_CMS_URL`
2. `cms/server.js` → CORS origin
3. `cms/.env` → Environment variables (lokaal)

### **Railway Environment Variables**
```
JWT_SECRET=min-32-karakters-random-string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=veilig-wachtwoord
NODE_ENV=production
```

## ✅ Checklist

- [ ] Railway/Heroku/Render account aangemaakt
- [ ] CMS gedeployed
- [ ] Environment variables ingesteld
- [ ] CMS URL gekopieerd
- [ ] `PRODUCTION_CMS_URL` in `js/data.js` ingesteld
- [ ] CORS in `cms/server.js` geconfigureerd
- [ ] Gecommit en gepusht naar GitHub
- [ ] CMS login getest
- [ ] Website test: data van CMS geladen
- [ ] Admin wachtwoord gewijzigd

## 🎉 Klaar!

Je website op GitHub Pages haalt nu live data van je CMS backend! 🚀

**Workflow:**
1. Login in CMS: `https://jouw-cms.up.railway.app`
2. Voeg/wijzig data
3. Klik "Opslaan"
4. Refresh website
5. **Wijzigingen zijn live!** ✨

---

**Vragen? Check de logs:**
- Railway: Dashboard → Logs tab
- Heroku: `heroku logs --tail`
- Render: Dashboard → Logs

**Succes!** 🎊
