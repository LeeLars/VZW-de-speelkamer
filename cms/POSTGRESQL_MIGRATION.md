# PostgreSQL Migration Guide

## 🎯 Wat is er veranderd?

De CMS is gemigreerd van LowDB (JSON file database) naar PostgreSQL voor permanente data opslag.

### Voordelen:
- ✅ **Data blijft bewaard** bij redeploys op Railway
- ✅ **Betere performance** bij veel data
- ✅ **Schaalbaarder** voor meerdere gebruikers
- ✅ **Professionele database** met backups

## 🚀 Railway Deployment

### Stap 1: PostgreSQL Database Toevoegen

1. Open je project op Railway.app
2. Klik op **"+ New"** → **"Database"** → **"Add PostgreSQL"**
3. Railway maakt automatisch een PostgreSQL database aan
4. De `DATABASE_URL` environment variable wordt automatisch ingesteld

### Stap 2: Environment Variables Controleren

Zorg dat deze variables zijn ingesteld in Railway:

```
DATABASE_URL=postgresql://... (automatisch ingesteld door Railway)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-veilige-wachtwoord
JWT_SECRET=jouw-geheime-jwt-key
NODE_ENV=production
CORS_ORIGIN=*
```

### Stap 3: Deploy

```bash
git add .
git commit -m "Migrate to PostgreSQL"
git push origin main
```

Railway zal automatisch:
1. De nieuwe code deployen
2. PostgreSQL database schema aanmaken
3. Default admin user en pricing data toevoegen

## 📊 Database Schema

De database heeft 5 tabellen:

- **users** - Gebruikers met bcrypt gehashte wachtwoorden
- **activities** - Vakantiekampen en vrije dagen
- **pricing** - Tarieven
- **team_members** - Teamleden
- **locations** - Locaties

## 🔄 Data Migratie (Optioneel)

Als je bestaande data hebt in de oude JSON database:

1. Exporteer de data uit `cms/database/db.json`
2. Gebruik de CMS interface om handmatig data toe te voegen
3. Of maak een migratie script (vraag de AI assistent)

## 🧪 Lokaal Testen

### PostgreSQL Installeren (Mac):

```bash
brew install postgresql@15
brew services start postgresql@15
```

### Database Aanmaken:

```bash
createdb vzw_speelkamer
```

### .env File:

```bash
cp .env.example .env
# Edit .env en vul DATABASE_URL in:
DATABASE_URL=postgresql://localhost:5432/vzw_speelkamer
```

### Dependencies Installeren:

```bash
cd cms
npm install
```

### Server Starten:

```bash
npm start
```

## 🐛 Troubleshooting

### "Connection refused" error

- Controleer of PostgreSQL draait op Railway
- Controleer of `DATABASE_URL` correct is ingesteld

### "relation does not exist" error

- Database schema is niet aangemaakt
- Herstart de applicatie op Railway

### Data verdwijnt nog steeds

- Controleer of je de PostgreSQL database gebruikt (niet de oude JSON file)
- Check Railway logs: `railway logs`

## 📝 Belangrijke Wijzigingen

### IDs zijn nu auto-increment integers

- Oude: `id: "act123"` (string)
- Nieuw: `id: 1` (integer)

### Timestamps zijn nu PostgreSQL timestamps

- Oude: `created_at: "2024-01-01T12:00:00.000Z"` (ISO string)
- Nieuw: `created_at: 2024-01-01 12:00:00` (timestamp)

### Image velden hernoemd

- `image` → `image_url` (voor consistency)

## ✅ Checklist

- [ ] PostgreSQL database toegevoegd op Railway
- [ ] Environment variables ingesteld
- [ ] Code gepusht naar GitHub
- [ ] Railway deployment succesvol
- [ ] Kan inloggen met admin account
- [ ] Data blijft bewaard na redeploy

## 🆘 Hulp Nodig?

Als je problemen hebt, check:
1. Railway logs: `railway logs`
2. Database connectie: Railway dashboard → PostgreSQL → Connect
3. Environment variables: Railway dashboard → Variables
