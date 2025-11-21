# 🚀 Deploy CMS naar Railway.app

## Waarom Railway?
- ✅ Zeer eenvoudig
- ✅ Automatische deployment vanuit GitHub
- ✅ Gratis $5 credit (genoeg voor 1 maand)
- ✅ Daarna €5/maand
- ✅ Geen credit card nodig voor trial

## 📋 Stappen (Duurt 5 minuten)

### Stap 1: Maak Railway Account

1. Ga naar: **https://railway.app**
2. Klik **"Start a New Project"**
3. Login met je **GitHub account**
4. Geef Railway toegang tot je repositories

### Stap 2: Deploy CMS

1. Klik **"Deploy from GitHub repo"**
2. Selecteer: **LeeLars/VZW-de-speelkamer**
3. Railway detecteert automatisch Node.js
4. Klik **"Deploy Now"**

### Stap 3: Configureer Root Directory

1. Klik op je project
2. Ga naar **"Settings"**
3. Bij **"Root Directory"** vul in: `cms`
4. Klik **"Save"**

### Stap 4: Voeg Environment Variables Toe

1. Ga naar **"Variables"** tab
2. Klik **"+ New Variable"**
3. Voeg deze toe:

```
JWT_SECRET=jouw-super-geheime-sleutel-minimaal-32-karakters-lang
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-veilig-wachtwoord
NODE_ENV=production
PORT=3001
```

⚠️ **Belangrijk**: Gebruik een sterk wachtwoord!

### Stap 5: Deploy!

1. Railway start automatisch de deployment
2. Wacht 2-3 minuten
3. Je krijgt een URL zoals: `https://vzw-de-speelkamer-production.up.railway.app`

### Stap 6: Test je CMS

1. Klik op de **"Deployments"** tab
2. Klik op de **URL** (of kopieer deze)
3. Je ziet nu de CMS login pagina!
4. Login met je admin credentials

## 🔗 Update Website Links

Nu moet je de CMS URL in je website updaten.

**Ik doe dit voor je automatisch in de volgende stap!**

## ✅ Checklist

- [ ] Railway account aangemaakt
- [ ] CMS gedeployed
- [ ] Environment variables toegevoegd
- [ ] CMS URL gekopieerd
- [ ] Kan inloggen op CMS

## 💰 Kosten

- **Eerste maand**: Gratis ($5 credit)
- **Daarna**: €5/maand
- **Annuleren**: Kan altijd

## ❓ Problemen?

### Build faalt
- Check of Root Directory op `cms` staat
- Verifieer dat alle environment variables zijn toegevoegd

### Kan niet inloggen
- Check of ADMIN_USERNAME en ADMIN_PASSWORD correct zijn
- Wacht 1 minuut na deployment

### 500 Error
- Check de logs in Railway dashboard
- Verifieer JWT_SECRET is ingesteld

---

**Klaar? Geef me je Railway CMS URL en ik update de website!**
