# CMS Quick Start Guide

## ✅ CMS is NU LIVE!

De CMS server draait op: **http://localhost:3001**

## 🔐 Inloggen

**Standaard credentials:**
- Gebruikersnaam: `admin`
- Wachtwoord: `changeme123`

⚠️ **BELANGRIJK**: Wijzig dit wachtwoord onmiddellijk na eerste login via "Instellingen" tab!

## 📋 Wat kun je nu doen?

### 1. Vakantiekampen Beheren
- Klik op "Vakantiekampen" tab
- Voeg nieuwe kampen toe met "+ Nieuw Kamp"
- Bewerk of verwijder bestaande kampen
- Alle wijzigingen worden direct opgeslagen in de database

### 2. Tarieven Aanpassen
- Klik op "Tarieven" tab
- Klik "Bewerken" bij een tarief
- Wijzig het bedrag (in euro's)
- Wijzig eventueel de beschrijving

### 3. Team Leden Beheren
- Klik op "Team" tab
- Voeg nieuwe teamleden toe met "+ Nieuw Teamlid"
- Upload foto's (max 5MB, JPG/PNG/GIF/WebP)
- Foto's worden automatisch opgeslagen in `/images/`

### 4. Wachtwoord Wijzigen
- Klik op "Instellingen" tab
- Vul huidig en nieuw wachtwoord in
- Minimaal 8 karakters vereist

## 📁 Database Locatie

Alle data wordt opgeslagen in:
```
/cms/database/db.json
```

Dit is een JSON bestand dat je kunt backuppen of handmatig bewerken indien nodig.

## 🖼️ Geüploade Foto's

Teamfoto's worden opgeslagen in:
```
/images/team-[timestamp]-[random].jpg
```

## 🔄 Server Herstarten

Als je de server moet herstarten:

```bash
cd cms
npm start
```

## 🛑 Server Stoppen

Druk `Ctrl+C` in de terminal waar de server draait.

## 📝 Volgende Stappen

Om de website de CMS data te laten gebruiken, moet je `js/data.js` aanpassen om data van de API te halen in plaats van statische data. Zie README.md voor details.

## ❓ Problemen?

- **Server start niet**: Check of port 3001 vrij is
- **Kan niet inloggen**: Check standaard credentials hierboven
- **Foto upload werkt niet**: Check of `/images` map bestaat en schrijfbaar is
- **API errors**: Check browser console (F12) voor details

## 🎉 Klaar!

Je CMS is volledig operationeel. Begin met het toevoegen van je eerste vakantiekamp!
