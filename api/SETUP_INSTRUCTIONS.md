# 🚀 API Setup Instructies voor Hostinger

## 📋 Stap 1: Database Aanmaken

1. **Login op Hostinger hPanel**
2. Ga naar **"Databases"** → **"MySQL Databases"**
3. Klik **"Create New Database"**
4. Vul in:
   - Database naam: `speelkamer_db` (of eigen naam)
   - Klik **"Create"**
5. **Noteer de credentials:**
   ```
   Database Host: localhost
   Database Name: [jouw_database_naam]
   Username: [jouw_username]
   Password: [jouw_password]
   ```

---

## 📊 Stap 2: Database Schema Importeren

1. Ga naar **"phpMyAdmin"** in Hostinger hPanel
2. Selecteer je database (links in de sidebar)
3. Klik op **"Import"** tab bovenaan
4. Klik **"Choose File"** en selecteer `database.sql`
5. Klik **"Go"** onderaan
6. ✅ Je zou moeten zien: "Import has been successfully finished"

---

## 🔧 Stap 3: API Configureren

1. Open `api/config.php`
2. Update de database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'jouw_database_naam');  // Van stap 1
   define('DB_USER', 'jouw_username');       // Van stap 1
   define('DB_PASS', 'jouw_password');       // Van stap 1
   ```
3. Sla op

---

## 📁 Stap 4: API Bestanden Uploaden

Upload de hele `api/` folder naar Hostinger:

```
public_html/
├── api/
│   ├── config.php
│   ├── activities.php
│   ├── team.php
│   ├── pricing.php
│   └── database.sql
├── index.html
└── ... (andere bestanden)
```

**Via File Manager:**
1. Ga naar **"File Manager"** in Hostinger
2. Navigeer naar `public_html/`
3. Upload de `api/` folder

**Via FTP (FileZilla):**
1. Connect met je FTP credentials
2. Upload `api/` folder naar `/public_html/`

---

## 🧪 Stap 5: API Testen

Test of de API werkt:

1. **Test Activities endpoint:**
   - Ga naar: `https://jouwdomein.be/api/activities.php`
   - Je zou moeten zien: `[]` (lege array) of bestaande activiteiten

2. **Test Team endpoint:**
   - Ga naar: `https://jouwdomein.be/api/team.php`
   - Je zou moeten zien: `[]` (lege array)

3. **Test Pricing endpoint:**
   - Ga naar: `https://jouwdomein.be/api/pricing.php`
   - Je zou moeten zien: `{"standardRate":"1.20","noonRate":"1.60"}`

Als je JSON data ziet → ✅ **API werkt!**

Als je een error ziet:
- Check database credentials in `config.php`
- Check of database.sql correct geïmporteerd is
- Check PHP error logs in Hostinger

---

## 🔄 Stap 6: Frontend Configureren

Update de API URL in je React app:

1. Open `/Users/larsleenders/Downloads/vzw-de-speelkamer/context/DataContext.tsx`
2. Zoek naar `const API_URL = ...`
3. Update naar: `const API_URL = 'https://jouwdomein.be/api'`
4. Build en deploy de app

---

## ✅ Verificatie Checklist

- [ ] Database aangemaakt in Hostinger
- [ ] Database schema geïmporteerd via phpMyAdmin
- [ ] `config.php` bijgewerkt met juiste credentials
- [ ] API bestanden geüpload naar `/public_html/api/`
- [ ] API endpoints testen (zie stap 5)
- [ ] Frontend API_URL bijgewerkt
- [ ] Website gebuild en gedeployed

---

## 🆘 Troubleshooting

### Error: "Database connection failed"
- Check credentials in `config.php`
- Check of database bestaat in phpMyAdmin

### Error: "Table doesn't exist"
- Importeer `database.sql` opnieuw in phpMyAdmin

### Error: "CORS policy"
- Check of `Access-Control-Allow-Origin` headers in `config.php` correct zijn

### Error: "404 Not Found"
- Check of `api/` folder in de juiste locatie staat (`/public_html/api/`)

---

## 📞 Support

Als je vastloopt, check:
1. PHP error logs in Hostinger hPanel
2. Browser console voor JavaScript errors
3. Network tab in browser DevTools

---

**🎉 Klaar! Je CMS data wordt nu opgeslagen in de cloud!**
