# ✅ VZW De Speelkamer - Setup Compleet!

## 🎉 Wat is er gebeurd?

Je website is nu volledig geïntegreerd met de Railway CMS API!

### 🔗 Belangrijke URLs

- **Website (Netlify)**: https://railwaycom-projectcc0448b-a4e8-4d6b-8275-a27fd2c5a7a7.netlify.app
- **CMS Backend (Railway)**: https://vzw-de-speelkamer-production.up.railway.app
- **CMS Dashboard**: https://vzw-de-speelkamer-production.up.railway.app (login pagina)

### 🔧 Wat werkt nu?

1. **Dynamische Content**: De website haalt nu alle data van de Railway API:
   - Team members
   - Locaties
   - Activiteiten (kampen & vrije dagen)
   - Prijzen

2. **CMS Dashboard**: Je kan nu via het CMS dashboard:
   - Team members toevoegen/bewerken
   - Locaties beheren
   - Activiteiten aanmaken
   - Prijzen aanpassen

3. **Automatische Updates**: Wanneer je iets wijzigt in het CMS, wordt dit direct zichtbaar op de website!

## 🚀 Hoe gebruik je het CMS?

### Stap 1: Login op het CMS

1. Ga naar: https://vzw-de-speelkamer-production.up.railway.app
2. Login met je admin credentials (die je hebt ingesteld in Railway)
3. Je ziet nu het CMS dashboard

### Stap 2: Data Beheren

**Team Members toevoegen:**
- Klik op "Team" in het menu
- Klik op "Nieuw Teamlid"
- Vul de gegevens in
- Upload een foto
- Selecteer locaties
- Klik "Opslaan"

**Activiteiten toevoegen:**
- Klik op "Activiteiten"
- Klik op "Nieuwe Activiteit"
- Kies type (Kamp of Vrije Dag)
- Vul data in
- Voeg Google Form URL toe
- Klik "Opslaan"

**Locaties beheren:**
- Klik op "Locaties"
- Bewerk bestaande locaties
- Of voeg nieuwe toe

## 🔐 Belangrijk: Beveiliging

### Railway Environment Variables

Zorg dat je in Railway de volgende environment variables hebt ingesteld:

```
JWT_SECRET=jouw-super-geheime-sleutel-minimaal-32-karakters-lang
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-veilig-wachtwoord
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
```

⚠️ **Verander het admin wachtwoord!**

### Hoe verander je het admin wachtwoord?

1. Ga naar Railway dashboard
2. Klik op je project
3. Ga naar "Variables"
4. Wijzig `ADMIN_PASSWORD`
5. Railway zal automatisch opnieuw deployen

## 📊 Hoe werkt het technisch?

### Data Flow

```
CMS Dashboard → Railway API → Website
     ↓              ↓            ↓
  Bewerk data   Opslag in    Toont data
                database     dynamisch
```

### Bestanden die belangrijk zijn:

- `/js/api-data.js` - Laadt data van Railway API
- `/cms/server.js` - Railway backend server
- `/cms/database/db.json` - Database met alle content
- `/cms/public/` - CMS dashboard interface

## 🔄 Updates Deployen

### Website updaten (Netlify)

```bash
git add .
git commit -m "Update website"
git push
```

Netlify zal automatisch de nieuwe versie deployen!

### CMS updaten (Railway)

```bash
git add cms/
git commit -m "Update CMS"
git push
```

Railway zal automatisch de nieuwe versie deployen!

## 🐛 Troubleshooting

### Website toont geen data?

1. Check of Railway deployment succesvol is
2. Open browser console (F12) en kijk naar errors
3. Test de API direct: https://vzw-de-speelkamer-production.up.railway.app/api/health

### CMS login werkt niet?

1. Check Railway logs voor errors
2. Verifieer environment variables in Railway
3. Check of JWT_SECRET is ingesteld

### CORS errors?

1. Check of `CORS_ORIGIN=*` is ingesteld in Railway
2. Of stel in: `CORS_ORIGIN=https://railwaycom-projectcc0448b-a4e8-4d6b-8275-a27fd2c5a7a7.netlify.app`

## 📝 Volgende Stappen

1. **Login op CMS** en verifieer dat alle data correct is geïmporteerd
2. **Test de website** en check of alle pagina's correct laden
3. **Wijzig het admin wachtwoord** in Railway
4. **Voeg een custom domain toe** aan Netlify (optioneel)
5. **Voeg een custom domain toe** aan Railway (optioneel)

## 💡 Tips

- **Backup je data**: Download regelmatig de `cms/database/db.json` file
- **Test eerst lokaal**: Gebruik `npm start` in de `cms/` folder om lokaal te testen
- **Monitor Railway**: Check regelmatig de Railway logs voor errors
- **Netlify Analytics**: Activeer analytics in Netlify om bezoekersstatistieken te zien

## 🎯 Klaar voor productie!

Je website is nu volledig operationeel met een professioneel CMS systeem. Veel succes! 🚀

---

**Vragen?** Check de documentatie in:
- `DEPLOY-CMS-RAILWAY.md` - Railway deployment instructies
- `README.md` - Algemene project informatie
