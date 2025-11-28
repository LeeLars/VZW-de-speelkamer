# 🎨 VZW De Speelkamer - CMS Features

## ✅ Wat werkt nu perfect in het CMS

### 🔐 **Authenticatie & Beveiliging**
- ✅ Veilige login met JWT tokens
- ✅ Wachtwoord wijzigen functionaliteit
- ✅ Automatische sessie verificatie
- ✅ Beschermde API endpoints
- ✅ Loading states en error handling bij login
- ✅ Visuele feedback (animaties, success/error states)

### 🎪 **Vakantiekampen & Activiteiten**
- ✅ Overzicht van alle kampen en vrije dagen
- ✅ Toevoegen van nieuwe activiteiten
- ✅ Bewerken van bestaande activiteiten
- ✅ Verwijderen van activiteiten
- ✅ Verschillende types: Kampen, Vrije Dagen, Studiedagen
- ✅ Google Forms integratie voor inschrijvingen
- ✅ Datum, uren en prijzen beheer

### 👥 **Team Management**
- ✅ Team leden toevoegen
- ✅ Team leden bewerken
- ✅ Team leden verwijderen
- ✅ Foto upload ondersteuning
- ✅ Rol en bio beheer
- ✅ Locatie toewijzing per teamlid
- ✅ Visuele kaarten met alle info

### 📍 **Locaties Management** (NIEUW!)
- ✅ Locaties overzicht
- ✅ Nieuwe locaties toevoegen
- ✅ Locaties bewerken
- ✅ Locaties verwijderen
- ✅ Adres, telefoon en email beheer
- ✅ Beschrijving en afbeelding ondersteuning
- ✅ Mooie visuele kaarten

### 💰 **Tarieven**
- ✅ Standaard tarieven beheren
- ✅ Middagtarief
- ✅ Woensdagnamiddag tarief
- ✅ Hele dag en halve dag tarieven
- ✅ Direct opslaan en updaten

### ⚙️ **Instellingen**
- ✅ Wachtwoord wijzigen
- ✅ Gebruikersprofiel
- ✅ Veilige logout functionaliteit

## 🎯 User Experience Verbeteringen

### 🎨 **Visueel Design**
- ✅ Modern en clean interface
- ✅ Responsive design (werkt op mobiel, tablet, desktop)
- ✅ Kleurenschema van De Speelkamer (teal, pink, yellow, mint)
- ✅ Smooth animaties en transitions
- ✅ Duidelijke iconen en visuele feedback

### 🚀 **Performance**
- ✅ Snelle laadtijden
- ✅ Efficiënte API calls
- ✅ Optimale database queries
- ✅ Caching waar mogelijk

### 🛡️ **Error Handling**
- ✅ Duidelijke foutmeldingen
- ✅ Validatie van invoer
- ✅ Bevestigingen bij verwijderen
- ✅ Loading states bij alle acties
- ✅ Success feedback na acties

## 🔗 API Endpoints

### **Publieke Endpoints** (geen authenticatie)
```
GET  /api/activities      - Alle activiteiten
GET  /api/team           - Alle teamleden
GET  /api/locations      - Alle locaties
GET  /api/pricing        - Tarieven
GET  /api/health         - Health check
```

### **Beschermde Endpoints** (authenticatie vereist)
```
POST   /api/activities        - Nieuwe activiteit
PUT    /api/activities/:id    - Activiteit bewerken
DELETE /api/activities/:id    - Activiteit verwijderen

POST   /api/team              - Nieuw teamlid
PUT    /api/team/:id          - Teamlid bewerken
DELETE /api/team/:id          - Teamlid verwijderen

POST   /api/locations         - Nieuwe locatie
PUT    /api/locations/:id     - Locatie bewerken
DELETE /api/locations/:id     - Locatie verwijderen

PUT    /api/pricing           - Tarieven updaten

POST   /api/auth/login        - Inloggen
POST   /api/auth/verify       - Token verificatie
POST   /api/auth/change-password - Wachtwoord wijzigen
```

## 📊 Database Structuur

Het CMS gebruikt een JSON database (`cms/database/db.json`) met de volgende structuur:

```json
{
  "users": [
    {
      "id": "user1",
      "username": "admin",
      "password": "hashed_password",
      "created_at": "timestamp"
    }
  ],
  "activities": [
    {
      "id": "camp1",
      "title": "Zomerkamp",
      "type": "CAMP",
      "start_date": "2024-07-01",
      "end_date": "2024-07-05",
      "hours": "09:00 - 16:00",
      "price": "€115",
      "google_form_url": "https://forms.gle/...",
      "description": "Beschrijving",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "team_members": [
    {
      "id": "t1",
      "name": "Naam",
      "role": "Rol",
      "bio": "Bio",
      "image_url": "./images/team.jpg",
      "location_ids": "loc1,loc2",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "locations": [
    {
      "id": "loc1",
      "name": "Locatie Naam",
      "address": "Adres",
      "description": "Beschrijving",
      "image": "./images/location.jpg",
      "phone": "050 12 34 56",
      "email": "info@example.com",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ],
  "pricing": [
    {
      "id": "pricing1",
      "standard_rate": 1.20,
      "noon_rate": 1.60,
      "wednesday_afternoon": 12.00,
      "full_day": 23.00,
      "half_day": 12.00,
      "updated_at": "timestamp"
    }
  ]
}
```

## 🚀 Hoe te gebruiken

### **Lokaal Testen**
```bash
cd cms
npm install
npm start
```
CMS draait op: http://localhost:3001

### **Productie (Railway)**
- URL: https://vzw-de-speelkamer-production.up.railway.app
- Login met je admin credentials
- Alle wijzigingen worden automatisch gesynchroniseerd met de website

### **Website (Netlify)**
- URL: https://railwaycom-projectcc0448b-a4e8-4d6b-8275-a27fd2c5a7a7.netlify.app
- Haalt automatisch data van Railway API
- Updates zijn direct zichtbaar

## 🔧 Technische Details

### **Backend Stack**
- Node.js + Express
- LowDB (JSON database)
- JWT voor authenticatie
- bcrypt voor wachtwoord hashing
- CORS voor cross-origin requests

### **Frontend Stack**
- Vanilla JavaScript
- Tailwind CSS
- Responsive design
- Modern ES6+ syntax

### **Deployment**
- Backend: Railway (automatisch via GitHub)
- Frontend: Netlify (automatisch via GitHub)
- Database: Persistent storage op Railway

## 📝 Volgende Stappen

1. ✅ Login op CMS: https://vzw-de-speelkamer-production.up.railway.app
2. ✅ Test alle functionaliteiten
3. ✅ Voeg echte data toe
4. ✅ Upload echte foto's
5. ✅ Test de website: check of alles correct laadt
6. ✅ Wijzig admin wachtwoord in Railway settings

## 💡 Tips & Tricks

### **Foto's Uploaden**
- Plaats foto's in `/images/` folder
- Gebruik relatieve paden: `./images/foto.jpg`
- Ondersteunde formaten: JPG, PNG, WebP
- Aanbevolen grootte: max 1MB per foto

### **Google Forms**
- Maak een Google Form voor elke activiteit
- Kopieer de URL
- Plak in het "Google Form URL" veld
- Gebruikers kunnen direct inschrijven

### **Backup**
- Download regelmatig `cms/database/db.json`
- Bewaar lokaal als backup
- Bij problemen: upload oude versie terug

### **Troubleshooting**
- Check Railway logs voor errors
- Test API endpoints met `/api/health`
- Verifieer CORS settings
- Check browser console voor frontend errors

## 🎉 Klaar voor Gebruik!

Het CMS is volledig functioneel en klaar voor productie gebruik. Alle features werken perfect en de integratie met de website is compleet!

**Veel succes met het beheren van je website! 🚀**
