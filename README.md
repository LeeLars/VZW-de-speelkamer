# 🎨 VZW De Speelkamer - Website

Moderne website voor VZW De Speelkamer - Buitenschoolse opvang in Antwerpen.

## 🚀 Features

- ✅ **Responsive Design** - Werkt op alle devices
- ✅ **Admin CMS** - Beheer activiteiten, team en prijzen
- ✅ **Mega Menu** - Intuïtieve navigatie
- ✅ **Activity Management** - Vakantiekampen & vrije dagen
- ✅ **Google Forms Integratie** - Eenvoudige inschrijvingen
- ✅ **Modern UI** - TailwindCSS styling

## 🛠️ Tech Stack

- **React 19.2** - UI Framework
- **TypeScript 5.8** - Type safety
- **Vite** - Build tool
- **React Router v7** - Routing
- **TailwindCSS** - Styling
- **Lucide Icons** - Icon library

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

## 🔐 Admin Panel

**URL:** `/admin`  
**Wachtwoord:** `speelkamer`

### Functies:
- ✏️ Activiteiten beheren (kampen & vrije dagen)
- 👥 Team leden toevoegen/bewerken
- 💰 Prijzen aanpassen
- 📰 Nieuws items beheren

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

---

**Ontwikkeld met ❤️ voor VZW De Speelkamer**
