# 🎨 VZW De Speelkamer - Website & CMS

Moderne website voor VZW De Speelkamer met geïntegreerd Content Management Systeem.

## 🌐 Live URLs

- **Website**: https://leelar5.github.io/VZW-de-speelkamer/
- **CMS**: https://vzw-de-speelkamer-production.up.railway.app/

## 📁 Project Structuur

```
vzw-de-speelkamer/
├── index.html              # Homepage
├── opvang.html            # Opvang & activiteiten
├── locaties.html          # Locaties overzicht
├── team.html              # Team pagina
├── contact.html           # Contact pagina
├── js/                    # JavaScript bestanden
│   ├── api-data.js       # API data loader
│   ├── main.js           # Algemene functionaliteit
│   ├── opvang.js         # Opvang pagina logic
│   ├── locaties.js       # Locaties pagina logic
│   └── team.js           # Team pagina logic
├── images/                # Afbeeldingen
├── styles.css             # Custom CSS
└── cms/                   # CMS Backend
    ├── server.js         # Express server
    ├── routes/           # API routes
    ├── database/         # Database (lowdb)
    ├── middleware/       # Auth middleware
    └── public/           # CMS frontend
```

## 🚀 Quick Start

### Website (GitHub Pages)
De website wordt automatisch gedeployed via GitHub Pages bij elke push naar `main`.

### CMS (Railway)
Het CMS draait op Railway en is verbonden met deze repository.

**Login credentials:**
- Username: `admin`
- Password: Ingesteld via Railway environment variables

## 🔧 Lokale Development

### Website
```bash
# Open gewoon de HTML bestanden in een browser
# Of gebruik een local server:
npx serve .
```

### CMS
```bash
cd cms
npm install
npm start
```

CMS draait op: http://localhost:3001

## 📝 CMS Features

### ✅ Wat kan je beheren?

1. **Vakantiekampen & Vrije Dagen**
   - Toevoegen, bewerken, verwijderen
   - Titel, data, uren, prijs, Google Form link
   - Type: Kamp, Vrije Dag, Studiedag
   - Filter & zoek functionaliteit
   - Dupliceer functie

2. **Team**
   - Teamleden beheren
   - Foto upload
   - Naam, rol, bio
   - Locaties toewijzen

3. **Locaties**
   - Locaties toevoegen/bewerken
   - Foto upload
   - Adres, telefoon, email
   - Beschrijving

4. **Tarieven**
   - Prijzen aanpassen
   - Standaard tarief, middagtoezicht, etc.

## 🔄 Deployment

### Automatisch
- **Push naar GitHub** → Website update (2-3 min)
- **Push naar GitHub** → CMS update via Railway (2-3 min)

### Manueel Railway Deploy
```bash
cd cms
railway up
```

## 🔐 Environment Variables (Railway)

Stel deze in via Railway dashboard:

```env
PORT=3001
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-veilig-wachtwoord
CORS_ORIGIN=*
NODE_ENV=production
```

## 📚 Documentatie

- **CMS Features**: Zie `CMS-FEATURES.md`
- **CMS Overzicht**: Zie `CMS-OVERZICHT.md`
- **Railway Deployment**: Zie `DEPLOY-CMS-RAILWAY.md`

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- TailwindCSS (via CDN)
- Responsive design

### Backend (CMS)
- Node.js + Express
- LowDB (JSON database)
- JWT authenticatie
- Multer (file uploads)

### Hosting
- **Website**: GitHub Pages
- **CMS**: Railway
- **Database**: Railway (persistent volume)

## 🎨 Design System

**Kleuren:**
- Teal: `#4EADB8` - Primaire kleur
- Pink: `#F28B8C` - Accent
- Yellow: `#F7DC6F` - Highlight
- Mint: `#A8D5A0` - Secundair

**Font:**
- ABeeZee (Google Fonts)

## 📞 Support

Voor vragen of problemen, contacteer de ontwikkelaar.

## 📄 License

© 2025 VZW De Speelkamer. Alle rechten voorbehouden.
