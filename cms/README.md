# VZW De Speelkamer - CMS

Een custom Content Management System voor het beheren van dynamische content op de VZW De Speelkamer website.

## Features

- ✅ **Vakantiekampen Beheer**: Voeg toe, bewerk en verwijder vakantiekampen en vrije dagen
- ✅ **Tarieven Beheer**: Update alle tarieven voor opvang en bijlessen
- ✅ **Team Beheer**: Beheer teamleden met foto upload
- ✅ **Beveiligde Login**: JWT authenticatie met wachtwoord wijziging
- ✅ **Image Upload**: Automatische opslag in `/images` map

## Installatie

### 1. Dependencies Installeren

```bash
cd cms
npm install
```

### 2. Environment Configuratie

Kopieer `.env.example` naar `.env`:

```bash
cp .env.example .env
```

Bewerk `.env` en wijzig de volgende waarden:

```env
# BELANGRIJK: Wijzig deze waarden!
JWT_SECRET=jouw-super-geheime-sleutel-hier
ADMIN_USERNAME=admin
ADMIN_PASSWORD=jouw-veilig-wachtwoord
```

### 3. Server Starten

**Development mode** (met auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

De server draait op: `http://localhost:3001`

## CMS Gebruiken

### 1. Inloggen

Open `cms/public/index.html` in je browser en log in met:
- **Gebruikersnaam**: De waarde uit `.env` (standaard: `admin`)
- **Wachtwoord**: De waarde uit `.env` (standaard: `changeme123`)

⚠️ **BELANGRIJK**: Wijzig het standaard wachtwoord onmiddellijk na eerste login!

### 2. Vakantiekampen Beheren

- Klik op "Vakantiekampen" tab
- Klik "+ Nieuw Kamp" om een kamp toe te voegen
- Vul alle velden in:
  - **Titel**: Naam van het kamp
  - **Type**: Kamp of Vrije Dag
  - **Startdatum & Einddatum**: Wanneer het plaatsvindt
  - **Uren**: Tijden (bijv. "09:00 - 16:00")
  - **Prijs**: Prijs met beschrijving (bijv. "€115 (week)")
  - **Google Form URL**: Link naar inschrijfformulier
  - **Beschrijving**: Optionele beschrijving

### 3. Tarieven Beheren

- Klik op "Tarieven" tab
- Klik op "Bewerken" bij een tarief
- Wijzig het bedrag en/of beschrijving
- Klik "Opslaan"

### 4. Team Beheren

- Klik op "Team" tab
- Klik "+ Nieuw Teamlid" om iemand toe te voegen
- Vul de gegevens in:
  - **Naam**: Volledige naam
  - **Rol**: Functie (bijv. "Algemeen Coördinator")
  - **Bio**: Korte beschrijving
  - **Locatie IDs**: Komma-gescheiden (bijv. "loc1,loc2")
  - **Foto**: Upload een foto (max 5MB)

De foto wordt automatisch opgeslagen in `/images/` met een unieke naam.

### 5. Wachtwoord Wijzigen

- Klik op "Instellingen" tab
- Vul huidig wachtwoord in
- Vul nieuw wachtwoord in (min. 8 karakters)
- Klik "Wachtwoord Wijzigen"

## API Endpoints

### Authenticatie
- `POST /api/auth/login` - Inloggen
- `GET /api/auth/verify` - Token verifiëren
- `POST /api/auth/change-password` - Wachtwoord wijzigen

### Activiteiten (Vakantiekampen)
- `GET /api/activities` - Alle activiteiten ophalen (public)
- `GET /api/activities/:id` - Enkele activiteit ophalen (public)
- `POST /api/activities` - Activiteit aanmaken (protected)
- `PUT /api/activities/:id` - Activiteit bijwerken (protected)
- `DELETE /api/activities/:id` - Activiteit verwijderen (protected)

### Tarieven
- `GET /api/pricing` - Alle tarieven ophalen (public)
- `GET /api/pricing/:category` - Enkel tarief ophalen (public)
- `PUT /api/pricing/:category` - Tarief bijwerken (protected)

### Team
- `GET /api/team` - Alle teamleden ophalen (public)
- `GET /api/team/:id` - Enkel teamlid ophalen (public)
- `POST /api/team` - Teamlid aanmaken (protected)
- `PUT /api/team/:id` - Teamlid bijwerken (protected)
- `DELETE /api/team/:id` - Teamlid verwijderen (protected)

## Database

De CMS gebruikt SQLite voor eenvoud. De database wordt automatisch aangemaakt bij eerste start in `cms/database/speelkamer.db`.

### Tabellen:
- `users` - Admin gebruikers
- `activities` - Vakantiekampen en vrije dagen
- `pricing` - Tarieven
- `team_members` - Teamleden
- `locations` - Locaties (referentie)

## Frontend Integratie

Om de frontend (website) de CMS data te laten gebruiken, moet je `js/data.js` aanpassen om data van de API te halen in plaats van statische data.

Voorbeeld:

```javascript
// In plaats van statische DATA object
const DATA = {
    activities: [...],
    team: [...]
};

// Gebruik API calls
async function loadData() {
    const activities = await fetch('http://localhost:3001/api/activities').then(r => r.json());
    const team = await fetch('http://localhost:3001/api/team').then(r => r.json());
    const pricing = await fetch('http://localhost:3001/api/pricing').then(r => r.json());
    
    return { activities, team, pricing };
}
```

## Beveiliging

- ✅ JWT tokens voor authenticatie
- ✅ Bcrypt voor wachtwoord hashing
- ✅ CORS configuratie
- ✅ File upload validatie (type & grootte)
- ✅ SQL injection bescherming (prepared statements)

⚠️ **Productie Checklist**:
1. Wijzig `JWT_SECRET` naar een sterke, willekeurige string
2. Wijzig standaard admin wachtwoord
3. Configureer CORS voor je productie domain
4. Gebruik HTTPS
5. Overweeg rate limiting toe te voegen

## Troubleshooting

### Server start niet
- Check of port 3001 vrij is
- Controleer of alle dependencies geïnstalleerd zijn: `npm install`

### Kan niet inloggen
- Controleer `.env` bestand
- Check console voor errors
- Verifieer dat database aangemaakt is

### Foto's uploaden niet
- Check of `/images` map bestaat en schrijfbaar is
- Controleer bestandsgrootte (max 5MB)
- Verifieer bestandstype (JPG, PNG, GIF, WebP)

### API errors
- Check of server draait op http://localhost:3001
- Open browser console voor details
- Check server logs in terminal

## Support

Voor vragen of problemen, check de server logs in de terminal waar `npm start` draait.
