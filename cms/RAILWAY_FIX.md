# Railway DATABASE_URL Fix

## Probleem
De CMS service krijgt de DATABASE_URL niet binnen, ondanks dat deze is toegevoegd.

## Oorzaak
De DATABASE_URL check gebeurde te vroeg in `database/db.js` voordat environment variabelen geladen waren.

## Oplossing Toegepast
✅ DATABASE_URL check verplaatst naar het juiste moment in `server.js`
✅ Betere error messages toegevoegd

## Railway Configuratie Checklist

### Stap 1: Controleer Postgres Service Naam
1. Ga naar je Railway project dashboard
2. Kijk naar de exacte naam van je Postgres service (let op hoofdletters!)
3. Noteer de exacte naam (bijvoorbeeld "Postgres" of "postgres" of "PostgreSQL")

### Stap 2: Configureer DATABASE_URL Correct

**BELANGRIJK**: De syntax is case-sensitive!

Als je Postgres service heet **"Postgres"** (met hoofdletter P):
```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
```

Als je Postgres service heet **"postgres"** (kleine letters):
```
DATABASE_URL = ${{postgres.DATABASE_URL}}
```

Als je Postgres service een andere naam heeft, bijvoorbeeld **"PostgreSQL"**:
```
DATABASE_URL = ${{PostgreSQL.DATABASE_URL}}
```

### Stap 3: Verifieer de Configuratie
1. Ga naar je CMS service in Railway
2. Klik op "Variables" tab
3. Controleer of DATABASE_URL er staat
4. Controleer of de syntax EXACT overeenkomt met je Postgres service naam
5. Klik op "Redeploy" (niet alleen "Deploy")

### Stap 4: Controleer Service Links
1. In je Railway project, controleer of de CMS service en Postgres service gelinkt zijn
2. Ga naar je CMS service → "Settings" → "Service Variables"
3. Je zou de Postgres variabelen moeten zien onder "Available Variables"

### Stap 5: Alternatieve Methode (als bovenstaande niet werkt)
In plaats van de reference syntax, kun je ook de directe connection string gebruiken:

1. Ga naar je Postgres service
2. Kopieer de DATABASE_URL waarde (de volledige connection string)
3. Ga naar je CMS service → Variables
4. Plak de volledige connection string als waarde voor DATABASE_URL

**LET OP**: Deze methode is minder flexibel omdat je de waarde handmatig moet updaten als de database credentials veranderen.

## Verificatie
Na het toepassen van de fix, zou je dit moeten zien in de Railway logs:
```
🔗 Connecting to database: [your-database-host]
🔄 Initializing database...
✅ Database initialized successfully
🚀 CMS Server running on port 3001
```

## Nog steeds problemen?
Als het nog steeds niet werkt, check dan:
1. Of de Postgres service daadwerkelijk draait in Railway
2. Of er geen typos zijn in de variable naam
3. De Railway deployment logs voor meer details
4. Of je de juiste service hebt geselecteerd (niet per ongeluk een oude deployment)
