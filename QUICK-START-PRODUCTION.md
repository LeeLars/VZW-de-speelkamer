# ⚡ Quick Start: CMS op GitHub Pages

## 🎯 Doel

Website op GitHub Pages met werkende CMS backend in **10 minuten**.

## 📋 Wat Je Nodig Hebt

- ✅ GitHub account (heb je al)
- ✅ Railway.app account (gratis, maak je zo aan)
- ✅ 10 minuten

## 🚀 Stappen (Railway - Aanbevolen)

### **1. Railway Account (2 min)**
1. Ga naar [railway.app](https://railway.app)
2. Klik "Login with GitHub"
3. Autoriseer Railway
4. ✅ Klaar!

### **2. Deploy CMS (3 min)**
1. Klik "New Project"
2. Selecteer "Deploy from GitHub repo"
3. Kies: `VZW-de-speelkamer`
4. Railway start deployment...
5. Ga naar "Settings"
6. Bij "Root Directory" vul in: `cms`
7. Klik "Save"
8. ✅ CMS deploy!

### **3. Environment Variables (2 min)**
1. Klik "Variables" tab
2. Voeg toe (klik "Add" na elke):
   ```
   JWT_SECRET → maak-een-lange-random-string-van-32-karakters
   ADMIN_USERNAME → admin
   ADMIN_PASSWORD → kies-een-veilig-wachtwoord
   NODE_ENV → production
   ```
3. ✅ Variables ingesteld!

### **4. Verkrijg CMS URL (1 min)**
1. Ga terug naar "Settings"
2. Scroll naar "Domains"
3. Klik "Generate Domain"
4. Kopieer de URL (bijv: `vzw-cms.up.railway.app`)
5. ✅ URL gekopieerd!

### **5. Configureer Website (2 min)**

**Optie A: Automatisch (Aanbevolen)**
```bash
./setup-production-cms.sh
```
Volg de prompts en klaar!

**Optie B: Handmatig**

Open `js/data.js`, zoek regel 7:
```javascript
const PRODUCTION_CMS_URL = null;
```

Wijzig naar (gebruik JOUW Railway URL):
```javascript
const PRODUCTION_CMS_URL = 'https://vzw-cms.up.railway.app/api';
```

Open `cms/server.js`, zoek rond regel 15:
```javascript
app.use(cors());
```

Wijzig naar:
```javascript
app.use(cors({
    origin: 'https://leelars.github.io',
    credentials: true
}));
```

### **6. Push naar GitHub (1 min)**
```bash
git add .
git commit -m "Configure production CMS"
git push origin main
```

Railway deploy automatisch opnieuw! ✅

### **7. Test! (1 min)**

**Test CMS:**
1. Open: `https://jouw-railway-url.up.railway.app`
2. Login met je credentials
3. Voeg een test kamp toe
4. ✅ CMS werkt!

**Test Website:**
1. Open: `https://leelars.github.io/VZW-de-speelkamer/`
2. Druk F12 (open console)
3. Refresh pagina
4. Zie: "✅ Activities loaded from CMS"
5. ✅ Website haalt CMS data!

## ✅ Klaar!

Je website op GitHub Pages haalt nu live data van je CMS! 🎉

## 🎨 Gebruik

**Workflow:**
1. Open CMS: `https://jouw-railway-url.up.railway.app`
2. Login
3. Voeg/wijzig vakantiekamp
4. Klik "Opslaan"
5. Ga naar website
6. Refresh (F5)
7. **Wijzigingen zijn live!** ✨

## 📊 Kosten

- **GitHub Pages**: €0
- **Railway**: €0 (gratis tier, $5 credit/maand)
- **Totaal**: €0 per maand

## 🐛 Problemen?

### **Website gebruikt fallback data**

Check in browser console (F12):
- ✅ Zie je: "✅ Activities loaded from CMS"?
  - Ja: Het werkt!
  - Nee: Zie hieronder

**Oplossing:**
1. Verifieer `PRODUCTION_CMS_URL` in `js/data.js`
2. Test CMS URL in browser: `https://jouw-url.up.railway.app/api/activities`
3. Check CORS in `cms/server.js`

### **CMS laadt niet**

**Oplossing:**
1. Check Railway logs: Dashboard → Logs tab
2. Verifieer environment variables
3. Check of "Root Directory" = `cms`

### **CORS Error**

**Oplossing:**
Update `cms/server.js` CORS:
```javascript
app.use(cors({
    origin: [
        'https://leelars.github.io',
        'http://localhost:8000'
    ],
    credentials: true
}));
```

Commit en push → Railway deploy automatisch.

## 📚 Meer Info

- **Gedetailleerde guide**: `GITHUB-CMS-SETUP.md`
- **CMS documentatie**: `cms/README.md`
- **Integratie info**: `CMS-INTEGRATION.md`

## 🎯 Checklist

- [ ] Railway account aangemaakt
- [ ] CMS gedeployed op Railway
- [ ] Environment variables ingesteld
- [ ] Railway domain gegenereerd
- [ ] `PRODUCTION_CMS_URL` in `js/data.js` ingesteld
- [ ] CORS in `cms/server.js` geconfigureerd
- [ ] Gecommit en gepusht naar GitHub
- [ ] CMS login getest
- [ ] Website test: CMS data geladen
- [ ] Admin wachtwoord gewijzigd via CMS

## 🎊 Succes!

Je hebt nu een volledig werkende website met CMS op GitHub Pages!

**Vragen?** Check `GITHUB-CMS-SETUP.md` voor meer details.
