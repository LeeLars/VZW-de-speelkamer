# 🎉 VZW De Speelkamer - CMS Compleet!

## ✅ Wat is er gebouwd?

Een volledig functioneel **Content Management System** waarmee de school zelfstandig de website kan beheren zonder technische kennis.

## 🚀 CMS Features

### 1. **Vakantiekampen Beheer**
- ✅ Voeg nieuwe kampen en vrije dagen toe
- ✅ Bewerk bestaande activiteiten
- ✅ Verwijder oude kampen
- ✅ Stel data, tijden, prijzen en Google Form links in
- ✅ Alle wijzigingen worden direct opgeslagen

### 2. **Tarieven Beheer**
- ✅ Pas alle tarieven aan (opvang, studie, bijles)
- ✅ Wijzig bedragen en beschrijvingen
- ✅ 6 verschillende tarief categorieën:
  - Standaard tarief (per halfuur)
  - Middagtoezicht
  - Woensdagnamiddag
  - Volle dag
  - Halve dag
  - Studiebegeleiding

### 3. **Team Beheer**
- ✅ Voeg teamleden toe en verwijder ze
- ✅ Upload foto's (max 5MB)
- ✅ Foto's worden automatisch opgeslagen in `/images/`
- ✅ Stel naam, rol, bio en locaties in
- ✅ Oude foto's worden automatisch verwijderd bij update

### 4. **Beveiliging**
- ✅ Beveiligde login met JWT tokens
- ✅ Wachtwoorden zijn gehashed (bcrypt)
- ✅ Wachtwoord wijzigen functie
- ✅ Sessie management (24 uur geldig)

## 📂 Project Structuur

```
vzw-de-speelkamer/
├── cms/                          # CMS Backend & Admin Interface
│   ├── database/
│   │   ├── init.js              # Database initialisatie
│   │   └── db.json              # JSON database (auto-created)
│   ├── middleware/
│   │   └── auth.js              # Authenticatie middleware
│   ├── routes/
│   │   ├── auth.js              # Login & wachtwoord routes
│   │   ├── activities.js        # Vakantiekampen API
│   │   ├── pricing.js           # Tarieven API
│   │   ├── team.js              # Team API met image upload
│   │   └── locations.js         # Locaties API
│   ├── public/                  # CMS Admin Interface
│   │   ├── index.html           # Hoofdpagina
│   │   └── js/
│   │       ├── config.js        # API configuratie
│   │       ├── auth.js          # Login logica
│   │       ├── activities.js    # Kampen beheer
│   │       ├── pricing.js       # Tarieven beheer
│   │       ├── team.js          # Team beheer
│   │       └── app.js           # Tab switching
│   ├── scripts/
│   │   └── import-existing-data.js  # Data import helper
│   ├── server.js                # Express server
│   ├── package.json             # Dependencies
│   ├── .env.example             # Environment template
│   ├── .gitignore              # Git ignore rules
│   ├── README.md               # Volledige documentatie
│   ├── INSTALL.md              # Installatie instructies
│   └── QUICKSTART.md           # Snelle start gids
└── images/                      # Geüploade foto's komen hier
```

## 🔧 Technologie Stack

**Backend:**
- Node.js + Express
- lowdb (JSON database)
- JWT voor authenticatie
- bcrypt voor wachtwoord hashing
- multer voor file uploads

**Frontend:**
- Vanilla JavaScript (geen frameworks)
- Tailwind CSS voor styling
- Moderne, responsive interface

## 🎯 Hoe te Gebruiken

### Stap 1: Server Starten

```bash
cd cms
npm install  # Eerste keer
npm start    # Server starten
```

Server draait op: **http://localhost:3001**

### Stap 2: Inloggen

- **Gebruikersnaam**: `admin`
- **Wachtwoord**: `changeme123`

⚠️ **Wijzig dit wachtwoord direct via Instellingen!**

### Stap 3: Data Beheren

1. **Vakantiekampen Tab**: Beheer alle kampen en vrije dagen
2. **Tarieven Tab**: Pas prijzen aan
3. **Team Tab**: Beheer teamleden en foto's
4. **Instellingen Tab**: Wijzig wachtwoord

## 📡 API Endpoints

Alle endpoints zijn beschikbaar op `http://localhost:3001/api`

### Public Endpoints (geen login vereist)
```
GET  /api/activities          # Alle activiteiten
GET  /api/activities/:id      # Enkele activiteit
GET  /api/pricing             # Alle tarieven
GET  /api/pricing/:category   # Enkel tarief
GET  /api/team                # Alle teamleden
GET  /api/team/:id            # Enkel teamlid
GET  /api/locations           # Alle locaties
```

### Protected Endpoints (login vereist)
```
POST   /api/auth/login              # Inloggen
GET    /api/auth/verify             # Token verifiëren
POST   /api/auth/change-password    # Wachtwoord wijzigen

POST   /api/activities              # Activiteit aanmaken
PUT    /api/activities/:id          # Activiteit bijwerken
DELETE /api/activities/:id          # Activiteit verwijderen

PUT    /api/pricing/:category       # Tarief bijwerken

POST   /api/team                    # Teamlid aanmaken (met foto upload)
PUT    /api/team/:id                # Teamlid bijwerken (met foto upload)
DELETE /api/team/:id                # Teamlid verwijderen
```

## 🔄 Website Integratie (Volgende Stap)

Om de website de CMS data te laten gebruiken, moet je `js/data.js` aanpassen:

**Huidige situatie:**
```javascript
const DATA = {
    activities: [...],  // Statische data
    team: [...]         // Statische data
};
```

**Nieuwe situatie (met CMS):**
```javascript
// Haal data van API
async function loadData() {
    const activities = await fetch('http://localhost:3001/api/activities').then(r => r.json());
    const team = await fetch('http://localhost:3001/api/team').then(r => r.json());
    const pricing = await fetch('http://localhost:3001/api/pricing').then(r => r.json());
    
    return { activities, team, pricing };
}

// Gebruik in je bestaande code
loadData().then(DATA => {
    // Render je pagina's met de DATA
    renderActivities(DATA.activities);
    renderTeam(DATA.team);
});
```

## 💾 Database Backup

De database is een simpel JSON bestand:
```
cms/database/db.json
```

**Backup maken:**
```bash
cp cms/database/db.json cms/database/db.backup.json
```

**Restore:**
```bash
cp cms/database/db.backup.json cms/database/db.json
```

## 🔒 Beveiliging Checklist

Voor productie gebruik:

- [ ] Wijzig `JWT_SECRET` in `.env` naar een sterke random string
- [ ] Wijzig admin wachtwoord via CMS interface
- [ ] Configureer CORS voor je productie domain
- [ ] Gebruik HTTPS (niet HTTP)
- [ ] Overweeg rate limiting toe te voegen
- [ ] Maak regelmatig backups van `db.json`

## 📝 Belangrijke Bestanden

| Bestand | Doel |
|---------|------|
| `cms/database/db.json` | Alle CMS data (backup dit!) |
| `cms/.env` | Configuratie & secrets (niet in git!) |
| `cms/server.js` | Hoofdserver bestand |
| `cms/public/index.html` | CMS admin interface |
| `images/team-*.jpg` | Geüploade teamfoto's |

## 🎨 Design

De CMS interface gebruikt dezelfde kleuren als de website:
- **sk_teal**: `#4AB1C4` (primaire kleur)
- **sk_mint**: `#B8D7A3`
- **sk_yellow**: `#F0E471`
- **sk_pink**: `#EF9294`

## 📞 Support & Documentatie

- **README.md**: Volledige technische documentatie
- **INSTALL.md**: Stap-voor-stap installatie
- **QUICKSTART.md**: Snelle start gids
- **Dit bestand**: Overzicht en samenvatting

## ✨ Wat Werkt Nu?

✅ **Backend API**: Volledig functioneel met alle CRUD operaties
✅ **Admin Interface**: Moderne, gebruiksvriendelijke interface
✅ **Authenticatie**: Veilige login met JWT tokens
✅ **Image Upload**: Automatische foto opslag in `/images`
✅ **Database**: JSON-based, makkelijk te backuppen
✅ **Documentatie**: Uitgebreide guides en README's

## 🚧 Volgende Stappen

1. **Test de CMS**: Log in en probeer alle functies
2. **Voeg data toe**: Gebruik de interface om kampen en team toe te voegen
3. **Wijzig wachtwoord**: Ga naar Instellingen en wijzig het standaard wachtwoord
4. **Integreer met website**: Pas `js/data.js` aan om API data te gebruiken
5. **Deploy**: Zet de CMS op een server voor productie gebruik

## 🎉 Klaar!

Je hebt nu een volledig werkend CMS systeem! De school kan nu zelfstandig:
- Vakantiekampen toevoegen en beheren
- Tarieven aanpassen
- Teamleden toevoegen met foto's
- Alles zonder code te hoeven schrijven

**Server is live op: http://localhost:3001**

Veel succes! 🚀
