# 🚀 Complete Deployment Guide - VZW De Speelkamer

## 📋 Overzicht

Deze guide helpt je om de website volledig te deployen naar Hostinger met cloud storage.

---

## 🎯 Wat Je Gaat Doen

1. ✅ **Favicon** → Al bijgewerkt naar logo
2. ⏳ **Database** → MySQL opzetten op Hostinger
3. ⏳ **API** → PHP endpoints uploaden
4. ⏳ **Frontend** → React app builden en uploaden
5. ⏳ **Testen** → Alles controleren

---

## 📊 DEEL 1: Database Setup (15 min)

### Stap 1: MySQL Database Aanmaken

1. Login op **Hostinger hPanel**
2. Ga naar **"Databases"** → **"MySQL Databases"**
3. Klik **"Create New Database"**
4. Noteer deze gegevens:
   ```
   Database Host: localhost
   Database Name: [jouw_naam]
   Username: [jouw_user]
   Password: [jouw_pass]
   ```

### Stap 2: Database Schema Importeren

1. Ga naar **"phpMyAdmin"** in hPanel
2. Selecteer je database (links)
3. Klik **"Import"** tab
4. Upload bestand: `api/database.sql`
5. Klik **"Go"**
6. ✅ Succes bericht zou moeten verschijnen

---

## 🔧 DEEL 2: API Setup (10 min)

### Stap 1: Config Bijwerken

1. Open `api/config.php` in een text editor
2. Update deze regels:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'jouw_database_naam');  // Van DEEL 1
   define('DB_USER', 'jouw_username');       // Van DEEL 1
   define('DB_PASS', 'jouw_password');       // Van DEEL 1
   ```
3. Sla op

### Stap 2: API Uploaden

Upload de `api/` folder naar Hostinger:

**Via File Manager:**
1. Ga naar **"File Manager"** in hPanel
2. Navigeer naar `public_html/`
3. Upload hele `api/` folder

**Via FTP (FileZilla):**
1. Connect met FTP credentials
2. Upload `api/` naar `/public_html/api/`

### Stap 3: API Testen

Test in je browser:
- `https://jouwdomein.be/api/activities.php` → Zou `[]` moeten tonen
- `https://jouwdomein.be/api/team.php` → Zou `[]` moeten tonen
- `https://jouwdomein.be/api/pricing.php` → Zou `{"standardRate":"1.20",...}` moeten tonen

✅ Als je JSON ziet → API werkt!

---

## 🎨 DEEL 3: Frontend Setup (10 min)

### Stap 1: Environment Variable

1. Maak bestand `.env.local` in project root:
   ```
   VITE_API_URL=https://jouwdomein.be/api
   ```
2. Vervang `jouwdomein.be` met je echte domein

### Stap 2: Build de App

In Windsurf terminal:
```bash
npm run build
```

Dit maakt een `dist/` folder met je website.

### Stap 3: Upload naar Hostinger

Upload **alles** uit de `dist/` folder naar `public_html/`:

**Structuur op Hostinger:**
```
public_html/
├── api/              (van DEEL 2)
│   ├── config.php
│   ├── activities.php
│   ├── team.php
│   └── pricing.php
├── assets/           (van dist/)
├── images/           (van dist/)
├── index.html        (van dist/)
└── ... (andere bestanden van dist/)
```

**⚠️ BELANGRIJK:** Upload de **INHOUD** van `dist/`, niet de `dist/` folder zelf!

---

## 🔒 DEEL 4: SSL Certificaat (2 min)

1. Ga naar **"SSL"** in Hostinger hPanel
2. Klik **"Install SSL"** voor je domein
3. Wacht 5-10 minuten
4. ✅ Je site draait nu op `https://`

---

## 🧪 DEEL 5: Testen (5 min)

### Test 1: Website Laadt
- Ga naar `https://jouwdomein.be`
- ✅ Homepage zou moeten laden

### Test 2: Admin Panel
- Ga naar `https://jouwdomein.be/admin`
- Login met wachtwoord: `speelkamer`
- ✅ Admin panel zou moeten laden

### Test 3: Activiteit Toevoegen
1. Klik "Nieuwe Activiteit"
2. Vul formulier in
3. Klik "Opslaan"
4. ✅ Activiteit verschijnt in lijst

### Test 4: Data Persistentie
1. Sluit browser
2. Open opnieuw: `https://jouwdomein.be/admin`
3. ✅ Activiteit staat er nog steeds!

### Test 5: Andere Computer
1. Open website op andere computer/telefoon
2. ✅ Activiteit is zichtbaar!

---

## 🎉 KLAAR!

Je website draait nu volledig in de cloud:
- ✅ **Favicon** → Logo
- ✅ **Database** → MySQL op Hostinger
- ✅ **API** → PHP endpoints werkend
- ✅ **Frontend** → React app live
- ✅ **SSL** → Veilige HTTPS verbinding
- ✅ **CMS** → Data in cloud, niet localStorage

---

## 🔄 Updates Maken

### Voor Code Wijzigingen:

```bash
# 1. Maak wijzigingen in Windsurf
# 2. Build opnieuw
npm run build

# 3. Upload nieuwe dist/ naar Hostinger
# 4. Klaar!
```

### Voor Content (Admin):
- Ga gewoon naar `/admin`
- Wijzigingen worden direct opgeslagen in database
- Geen rebuild nodig!

---

## 🆘 Troubleshooting

### "API Error" in browser console
- Check of API endpoints bereikbaar zijn
- Check database credentials in `config.php`
- Check PHP error logs in Hostinger

### Activiteiten verdwijnen na refresh
- API is niet correct geconfigureerd
- Check `.env.local` heeft juiste API_URL
- Rebuild de app na `.env.local` wijziging

### "CORS Error"
- Check `Access-Control-Allow-Origin` in `api/config.php`
- Zou `*` moeten zijn voor development

### 404 op `/admin` route
- Voeg `.htaccess` toe (zie hieronder)

---

## 📝 .htaccess voor React Router

Maak bestand `.htaccess` in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

Dit zorgt ervoor dat React Router correct werkt.

---

## 📞 Support

Bij problemen, check:
1. Browser console (F12) voor JavaScript errors
2. Network tab voor API calls
3. Hostinger PHP error logs
4. Database in phpMyAdmin

---

**🎊 Gefeliciteerd! Je website is live met cloud storage!**
