# CMS Installatie Instructies

## Stap 1: Dependencies Installeren

Open een terminal in de `cms` folder en voer uit:

```bash
npm install
```

## Stap 2: Environment File Aanmaken

Kopieer het voorbeeld bestand:

```bash
cp .env.example .env
```

Of maak handmatig een `.env` bestand aan met:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=verander-dit-naar-een-lange-willekeurige-string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
CORS_ORIGIN=*
```

⚠️ **BELANGRIJK**: Wijzig `JWT_SECRET` en `ADMIN_PASSWORD` naar veilige waarden!

## Stap 3: Server Starten

```bash
npm start
```

Of voor development met auto-reload:

```bash
npm run dev
```

## Stap 4: CMS Openen

Open in je browser:
```
http://localhost:3001
```

Log in met de credentials uit je `.env` bestand.

## Stap 5: Wachtwoord Wijzigen

Na eerste login:
1. Ga naar "Instellingen" tab
2. Wijzig het standaard wachtwoord
3. Gebruik minimaal 8 karakters

## Klaar!

Je CMS is nu klaar voor gebruik. Zie README.md voor meer details.
