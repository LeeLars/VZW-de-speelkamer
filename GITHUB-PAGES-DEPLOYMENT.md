# 🚀 GitHub Pages Deployment - Stap voor Stap

## ⚠️ Belangrijk: GitHub Pages Beperkingen

**GitHub Pages kan alleen STATISCHE bestanden hosten (HTML/CSS/JS).**

Dit betekent:
- ✅ Je website (HTML bestanden) werkt perfect
- ❌ De CMS backend (Node.js server) werkt NIET op GitHub Pages
- ❌ Database en API endpoints werken NIET

## 💡 Oplossing: Hybride Aanpak

### Optie 1: Website op GitHub Pages + CMS Lokaal (Aanbevolen voor nu)

**Voordelen:**
- Website is direct online voor bezoekers
- CMS gebruik je alleen lokaal op je eigen computer
- Gratis
- Geen extra configuratie nodig

**Nadelen:**
- Je moet CMS lokaal draaien om wijzigingen te maken
- Wijzigingen moeten handmatig naar GitHub gepusht worden

### Optie 2: Alles op GitHub Pages (Zonder CMS Backend)

**Voordelen:**
- Volledig gratis
- Zeer eenvoudig

**Nadelen:**
- Geen CMS functionaliteit
- Data moet handmatig in code aangepast worden

### Optie 3: Website op GitHub Pages + CMS op Railway (€5/maand)

**Voordelen:**
- Website gratis online
- CMS werkt online (overal toegankelijk)
- Volledig functioneel

**Nadelen:**
- Kost €5/maand voor Railway

## 🎯 Aanbevolen: Optie 1 Implementeren

### Stap 1: GitHub Pages Activeren

1. **Ga naar je GitHub repository:**
   https://github.com/LeeLars/VZW-de-speelkamer

2. **Klik op "Settings"** (bovenaan, rechts)

3. **Scroll naar "Pages"** (in het linker menu)

4. **Configureer:**
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`

5. **Klik "Save"**

6. **Wacht 2-5 minuten**

7. **Je website is nu live op:**
   ```
   https://leelars.github.io/VZW-de-speelkamer/
   ```

### Stap 2: CMS Lokaal Gebruiken

Wanneer je content wilt aanpassen:

```bash
# 1. Start CMS lokaal
cd cms
npm start

# 2. Open CMS in browser
open http://localhost:3001

# 3. Login en maak wijzigingen
# Gebruikersnaam: admin
# Wachtwoord: changeme123

# 4. Wijzigingen worden opgeslagen in cms/database/db.json
```

### Stap 3: Wijzigingen Publiceren

Na het maken van wijzigingen in de CMS:

```bash
# 1. Commit de database wijzigingen
git add cms/database/db.json
git commit -m "Update content via CMS"

# 2. Push naar GitHub
git push origin main

# 3. GitHub Pages update automatisch (duurt 1-2 minuten)
```

## 🔄 Workflow Samenvatting

```
1. Maak wijzigingen in CMS (lokaal)
   ↓
2. Data wordt opgeslagen in db.json
   ↓
3. Commit en push naar GitHub
   ↓
4. GitHub Pages update automatisch
   ↓
5. Website is bijgewerkt!
```

## 📝 Custom Domein (Optioneel)

Als je een eigen domein hebt (bijv. `www.vzwdespeelkamer.be`):

1. **In GitHub Pages Settings:**
   - Vul je domein in bij "Custom domain"
   - Klik "Save"

2. **Bij je domein provider:**
   - Voeg een CNAME record toe:
     ```
     CNAME: www → leelars.github.io
     ```
   - Of A records voor apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Wacht op DNS propagatie** (kan 24 uur duren)

4. **Activeer HTTPS** in GitHub Pages settings

## ⚡ Snelle Test

Na activeren van GitHub Pages:

1. Bezoek: `https://leelars.github.io/VZW-de-speelkamer/`
2. Navigeer door de pagina's
3. Check of alles werkt

## 🐛 Troubleshooting

### Website laadt niet
- Wacht 5 minuten na activeren
- Check of branch correct is ingesteld (main)
- Verifieer dat index.html in root staat

### CSS/Images laden niet
- Check of paden relatief zijn (niet absolute)
- Verifieer dat `/images` folder in repository staat

### CMS link werkt niet
- Dit is normaal! CMS werkt alleen lokaal
- Footer link wijst naar `./cms/` wat lokaal werkt

## 💡 Upgrade Naar Volledige Online CMS (Later)

Als je later de CMS online wilt hebben:

1. **Deploy CMS naar Railway.app** (€5/maand)
2. **Update API URL** in `cms/public/js/config.js`
3. **Push naar GitHub**
4. **CMS werkt nu online!**

Zie `DEPLOYMENT.md` voor volledige instructies.

## ✅ Checklist

- [ ] GitHub Pages geactiveerd
- [ ] Website bereikbaar op GitHub Pages URL
- [ ] Alle pagina's werken
- [ ] Images laden correct
- [ ] CMS werkt lokaal
- [ ] Weet hoe je wijzigingen publiceert

## 🎉 Klaar!

Je website is nu live en toegankelijk voor iedereen!

**Website URL:** `https://leelars.github.io/VZW-de-speelkamer/`

Voor wijzigingen: gebruik CMS lokaal → commit → push → klaar!

---

**Vragen?** Check `DEPLOYMENT.md` voor meer opties.
