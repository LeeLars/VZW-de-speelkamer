# 🎨 VZW De Speelkamer - Website

Moderne website voor VZW De Speelkamer - Buitenschoolse opvang in Brugge.

## ⚡ NIEUW: Pure HTML/CSS/JS Versie Beschikbaar!

**Het React project is nu ook beschikbaar als pure HTML/CSS/JavaScript versie!**

✅ **Geen build process nodig**  
✅ **Geen Node.js of npm vereist**  
✅ **Direct te openen in browser**  
✅ **Makkelijk te hosten op elke server**  
✅ **Zelfde design en functionaliteit**  

👉 **Open gewoon `index.html` in je browser en het werkt!**

[Zie hieronder voor meer details](#-pure-htmlcssjs-versie)

## 🚀 Features

- ✅ **Responsive Design** - Werkt op alle devices
- ✅ **Custom CMS** - Volledig beheer systeem met backend API
- ✅ **Vakantiekampen Beheer** - Voeg toe, bewerk en verwijder kampen
- ✅ **Tarieven Beheer** - Pas alle prijzen aan via CMS
- ✅ **Team Beheer** - Upload foto's en beheer teamleden
- ✅ **Beveiligde Login** - JWT authenticatie met wachtwoord beheer
- ✅ **Image Upload** - Automatische foto opslag in `/images`
- ✅ **Google Forms Integratie** - Eenvoudige inschrijvingen
- ✅ **Modern UI** - TailwindCSS styling

## 🛠️ Tech Stack

### Originele React Versie (voor developers)
- **React 19.2** - UI Framework
- **TypeScript 5.8** - Type safety
- **Vite** - Build tool
- **React Router v7** - Routing
- **TailwindCSS** - Styling
- **Lucide Icons** - Icon library

### Pure HTML/CSS/JS Versie (aanbevolen voor productie)
- **Vanilla JavaScript** - Geen frameworks
- **Tailwind CSS CDN** - Styling
- **Hash-based routing** - Single Page Application
- **Inline SVG** - Icons

## 📦 Installatie

### Prerequisites
- Node.js 18+ 
- npm of yarn

### Setup

```bash
# Clone repository
git clone https://github.com/LeeLars/Website-voor-VZW-De-Speelkamer---Buitenschoolse-opvang.git
cd vzw-de-speelkamer

# Installeer dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in je browser.

## 🏗️ Build voor Productie

```bash
# Build applicatie
npm run build

# Preview build
npm run preview
```

De build output staat in de `dist/` folder.

## 📁 Project Structuur

```
vzw-de-speelkamer/
├── components/          # React componenten
│   └── Layout.tsx      # Header, Footer, Navigatie
├── pages/              # Route paginas
│   ├── Home.tsx
│   ├── Opvang.tsx
│   ├── Admin.tsx
│   └── ...
├── context/            # React Context
│   └── DataContext.tsx # Data management
├── images/             # Afbeeldingen
├── constants.ts        # Configuratie & initiële data
├── types.ts           # TypeScript types
└── App.tsx            # Main app component
```

## 🔐 Content Management System (CMS)

**URL:** `/cms/` (of `http://localhost:3001` lokaal)  
**Standaard Login:**
- Gebruikersnaam: `admin`
- Wachtwoord: `changeme123` ⚠️ **Wijzig dit direct!**

### CMS Features:
- ✏️ **Vakantiekampen Beheer** - Voeg kampen toe met data, tijden, prijzen en Google Form links
- 👥 **Team Beheer** - Upload foto's (max 5MB), beheer teamleden
- 💰 **Tarieven Beheer** - Pas alle 6 tarieven aan (opvang, studie, bijles)
- 🔒 **Beveiliging** - JWT tokens, bcrypt wachtwoorden, wachtwoord wijzigen
- 📸 **Image Upload** - Foto's worden automatisch opgeslagen in `/images/`
- 💾 **JSON Database** - Eenvoudig te backuppen (`cms/database/db.json`)

### CMS Installatie:

```bash
# Installeer CMS dependencies
cd cms
npm install

# Configureer environment
cp .env.example .env
# Edit .env met je eigen waarden!

# Start CMS server
npm start
```

CMS draait op: **http://localhost:3001**

📖 **Volledige CMS documentatie**: Zie `cms/README.md` en `DEPLOYMENT.md`

### CMS in Productie (GitHub Pages):

Om de CMS te gebruiken op GitHub Pages:

**Optie 1: Automatisch Setup Script**
```bash
./setup-production-cms.sh
```

**Optie 2: Handmatig**
1. Deploy CMS naar Railway/Heroku/Render (zie `GITHUB-CMS-SETUP.md`)
2. Update `PRODUCTION_CMS_URL` in `js/data.js`
3. Update CORS in `cms/server.js`
4. Push naar GitHub

📖 **Gedetailleerde instructies**: Zie `GITHUB-CMS-SETUP.md`

## 🎯 Belangrijke Bestanden

### `constants.ts`
Bevat initiële data:
- Locaties (VBS De Frères, Het Kleurenpalet, Sint-Andreas)
- Standaard activiteiten
- Contact informatie
- Facebook links

### `types.ts`
TypeScript interfaces voor:
- Activity (kampen & vrije dagen)
- Location
- TeamMember
- Pricing

### `DataContext.tsx`
Centrale data management:
- Merget localStorage met constants.ts
- CRUD operaties voor alle data types
- Automatische synchronisatie

## 🚀 Deployment naar Hostinger

### Stap 1: Build
```bash
npm run build
```

### Stap 2: Upload
Upload de `dist/` folder naar Hostinger:
- Via File Manager
- Via FTP (FileZilla)
- Via Git (als beschikbaar)

### Stap 3: Database Setup (optioneel)
Als je MySQL gebruikt:
1. Maak database aan in Hostinger
2. Upload PHP API bestanden
3. Importeer SQL schema
4. Update API endpoints in code

### Stap 4: SSL
Activeer gratis SSL certificaat in Hostinger panel.

## 🔄 GitHub Workflow

### Development
```bash
# Maak wijzigingen
git add .
git commit -m "Feature: beschrijving"
git push
```

### Branches
- `main` - Production ready code
- `dev` - Development branch (optioneel)

## 📝 Content Beheer

### Activiteiten Toevoegen
1. Ga naar `/admin`
2. Klik "Nieuwe Activiteit"
3. Selecteer type (Kamp/Vrije Dag)
4. Kies categorie (Pedagogische studiedag, etc.)
5. Vul datums in → Titel wordt automatisch gegenereerd
6. Plak Google Form link
7. Opslaan!

### Titel Formaat
- **Meerdere dagen:** `Herfstvakantie 27 t/m 31 oktober 2025`
- **Enkele dag:** `Pedagogische studiedag 3 oktober 2025`

## 🎨 Kleuren (Brand Colors)

```css
--sk_teal: #4db8c9      /* Primary */
--sk_yellow: #ffd966    /* Accent */
--sk_pink: #ff6b9d      /* Secondary */
--sk_slate: #2d3748     /* Text */
```

## 📞 Contact

**VZW De Speelkamer**  
Email: info@vzwdespeelkamer.be  
Facebook: [facebook.com/opvangminipalet](https://www.facebook.com/opvangminipalet)

## 📄 License

© 2025 VZW De Speelkamer. Alle rechten voorbehouden.

## 🌐 Pure HTML/CSS/JS Versie

### Waarom deze versie?

De pure HTML versie is gemaakt omdat:
- React soms problemen geeft met hosting
- Geen build process = sneller en eenvoudiger
- Werkt op elke webserver zonder configuratie
- Makkelijker te onderhouden voor niet-developers

### Hoe te gebruiken

**Optie 1: Direct openen (lokaal testen)**
```bash
# Dubbelklik gewoon op index.html
# Of via terminal:
open index.html
```

**Optie 2: Met lokale server (aanbevolen)**
```bash
# Python 3
python3 -m http.server 8000

# Dan open: http://localhost:8000
```

**Optie 3: Upload naar webserver**
- Upload alle bestanden via FTP/SFTP
- Zorg dat de `/images` folder mee wordt geüpload
- Klaar! De site werkt direct

### Wat zit erin?

Het `index.html` bestand bevat:

✅ **5 Pagina's** (hash-based routing):
- `#home` - Homepage met hero sectie
- `#opvang` - Opvang & Studie info
- `#locaties` - 3 Locaties met foto's
- `#team` - Team members
- `#contact` - Contactgegevens

✅ **Functionaliteit**:
- Responsive navigatie (desktop + mobile)
- Dynamische content rendering
- Smooth page transitions
- Active navigation states

### Data aanpassen

Open `index.html` en scroll naar het `<script>` gedeelte onderaan:

```javascript
// Locaties aanpassen
const LOCATIONS = [
    { id: 'loc1', name: 'VBS De Frères', ... },
    // Voeg meer toe of pas aan
];

// Team members aanpassen
const TEAM = [
    { id: 't1', name: 'Sarah Pieters', ... },
    // Voeg meer toe of pas aan
];
```

### Deployment

**Netlify (gratis & makkelijk):**
1. Ga naar [netlify.com/drop](https://app.netlify.com/drop)
2. Sleep de hele project folder naar de pagina
3. Klaar! Je krijgt een live URL

**Hostinger / cPanel:**
1. Upload via File Manager of FTP
2. Zet bestanden in `public_html/` folder
3. Bezoek je domein

**GitHub Pages:**
```bash
git add .
git commit -m "HTML versie"
git push
# Enable GitHub Pages in repository settings
```

### Voordelen vs React versie

| Feature | React | Pure HTML |
|---------|-------|----------|
| Build nodig | ✅ Ja | ❌ Nee |
| Node.js vereist | ✅ Ja | ❌ Nee |
| Hosting | Complex | Simpel |
| Laadtijd | ~500kb | ~50kb |
| Onderhoud | Developer | Iedereen |
| Admin panel | ✅ Ja | ⚠️ Nog toe te voegen |

### Volgende stappen (optioneel)

Om meer functionaliteit toe te voegen:

1. **Admin panel**: Maak `admin.html` met formulieren
2. **Backend**: Voeg PHP/Node.js API toe voor data opslag
3. **CMS**: Integreer headless CMS (Strapi, Contentful)
4. **Forms**: Gebruik FormSpree of Netlify Forms voor contact

---

**Ontwikkeld met ❤️ voor VZW De Speelkamer**
