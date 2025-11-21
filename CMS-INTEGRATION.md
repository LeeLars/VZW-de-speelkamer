# 🔄 CMS Integratie - Hoe het Werkt

## Overzicht

De website haalt nu **automatisch** data van de CMS API wanneer je lokaal werkt. Wijzigingen in de CMS worden direct zichtbaar op de website!

## 🎯 Hoe Werkt Het?

### **Lokaal (Development)**
```
Website → CMS API (localhost:3001) → Database → Website toont CMS data
```

Wanneer je:
1. De CMS server draait (`npm start` in `/cms`)
2. De website opent in browser
3. **Automatisch** data van CMS API haalt

### **Productie (GitHub Pages)**
```
Website → Geen CMS API → Fallback naar statische data
```

Op GitHub Pages:
- Geen Node.js server beschikbaar
- Website gebruikt **statische fallback data**
- Werkt perfect zonder CMS

## 📁 Belangrijke Bestanden

### **`js/data.js`** - Dynamische Data Loader
Dit bestand:
- ✅ Detecteert automatisch localhost vs productie
- ✅ Haalt data van CMS API (lokaal)
- ✅ Gebruikt fallback data (productie)
- ✅ Transformeert CMS data naar juiste formaat
- ✅ 5 seconden timeout voor API calls

**Voorbeeld:**
```javascript
// Automatische detectie
const API_CONFIG = {
    baseUrl: (window.location.hostname === 'localhost')
        ? 'http://localhost:3001/api'  // Lokaal: gebruik CMS
        : null                          // Productie: gebruik fallback
};
```

### **`js/main.js`** - Initialisatie
Wacht tot data geladen is:
```javascript
document.addEventListener('DOMContentLoaded', async function() {
    // Wacht op data van CMS of fallback
    if (typeof dataPromise !== 'undefined') {
        await dataPromise;
    }
    
    // Nu is DATA beschikbaar!
    console.log(DATA.activities); // CMS data of fallback
});
```

## 🔄 Data Flow

### 1. **Page Load**
```
Browser laadt index.html
  ↓
Laadt js/data.js
  ↓
data.js detecteert omgeving
```

### 2. **Lokaal (CMS beschikbaar)**
```
Fetch http://localhost:3001/api/activities
Fetch http://localhost:3001/api/team
Fetch http://localhost:3001/api/pricing
Fetch http://localhost:3001/api/locations
  ↓
Transform CMS data
  ↓
DATA object gevuld met CMS data
  ↓
Website toont CMS data ✅
```

### 3. **Productie (geen CMS)**
```
Geen API URL geconfigureerd
  ↓
Gebruik FALLBACK_DATA
  ↓
DATA object gevuld met statische data
  ↓
Website toont fallback data ✅
```

## 🎨 Data Transformatie

CMS API gebruikt snake_case, website gebruikt camelCase:

**CMS Format:**
```json
{
  "id": "vk1",
  "title": "Herfstvakantie",
  "start_date": "2025-10-27",
  "end_date": "2025-10-31",
  "google_form_url": "https://forms.gle/..."
}
```

**Website Format:**
```javascript
{
  id: "vk1",
  title: "Herfstvakantie",
  startDate: "2025-10-27",
  endDate: "2025-10-31",
  googleFormUrl: "https://forms.gle/..."
}
```

De `transformCMSData()` functie doet deze conversie automatisch!

## ✅ Wat Werkt Nu?

### **Lokaal Testen:**
```bash
# Terminal 1: Start CMS
cd cms
npm start

# Terminal 2: Open website
open index.html
# Of gebruik een local server:
python3 -m http.server 8000
```

**Resultaat:**
- ✅ Website haalt data van CMS API
- ✅ Wijzigingen in CMS zijn direct zichtbaar
- ✅ Refresh pagina om nieuwe data te zien
- ✅ Console toont: "✅ Activities loaded from CMS"

### **Productie (GitHub Pages):**
```
Website op: https://leelars.github.io/VZW-de-speelkamer/
```

**Resultaat:**
- ✅ Website gebruikt statische fallback data
- ✅ Geen API errors
- ✅ Werkt perfect zonder CMS server
- ✅ Console toont: "📦 Using static fallback data"

## 🔧 Hoe Te Gebruiken

### **Stap 1: Start CMS**
```bash
cd cms
npm start
```
CMS draait op: http://localhost:3001

### **Stap 2: Login in CMS**
- Open http://localhost:3001
- Login: `admin` / `changeme123`

### **Stap 3: Voeg Data Toe**
Bijvoorbeeld een nieuw vakantiekamp:
- Klik "Vakantiekampen" tab
- Klik "+ Nieuw Kamp"
- Vul gegevens in
- Klik "Opslaan"

### **Stap 4: Refresh Website**
- Open index.html in browser
- Druk F5 (refresh)
- **Nieuw kamp verschijnt automatisch!** 🎉

## 📊 Console Output

### **Lokaal met CMS:**
```
🔄 Loading data...
📡 Fetching from CMS API...
✅ Activities loaded from CMS
✅ Team loaded from CMS
✅ Pricing loaded from CMS
✅ Locations loaded from CMS
✅ Data loaded successfully
✅ Page initialized with loaded data
```

### **Lokaal zonder CMS:**
```
🔄 Loading data...
📡 Fetching from CMS API...
⚠️ Failed to fetch from CMS (activities): Failed to fetch
⚠️ Using fallback activities
⚠️ Using fallback team
⚠️ Using fallback pricing
⚠️ Using fallback locations
✅ Data loaded successfully
✅ Page initialized with loaded data
```

### **Productie (GitHub Pages):**
```
🔄 Loading data...
📦 Using static fallback data (no CMS API configured)
✅ Data loaded successfully
✅ Page initialized with loaded data
```

## 🐛 Troubleshooting

### **"Using fallback data" terwijl CMS draait**

**Probleem:** CMS server draait, maar website gebruikt fallback.

**Oplossing:**
1. Check of CMS draait: http://localhost:3001
2. Check browser console voor errors
3. Verifieer CORS instellingen in `cms/server.js`
4. Test API direct: http://localhost:3001/api/activities

### **CORS Errors**

**Probleem:** `Access-Control-Allow-Origin` error in console.

**Oplossing:**
Update `cms/server.js`:
```javascript
app.use(cors({
    origin: '*', // Voor development
    credentials: true
}));
```

### **Data niet bijgewerkt**

**Probleem:** Wijzigingen in CMS niet zichtbaar op website.

**Oplossing:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) of `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check of CMS data echt opgeslagen is (refresh CMS interface)

## 🚀 Voor Productie

Als je de CMS wilt gebruiken in productie:

### **Optie 1: Deploy CMS op Heroku/Railway**

1. Deploy CMS backend naar Heroku/Railway
2. Update `js/data.js`:
```javascript
const API_CONFIG = {
    baseUrl: (window.location.hostname === 'localhost')
        ? 'http://localhost:3001/api'
        : 'https://jouw-cms.herokuapp.com/api' // Je productie CMS URL
};
```

3. Configureer CORS in `cms/server.js`:
```javascript
app.use(cors({
    origin: 'https://leelars.github.io', // Je GitHub Pages URL
    credentials: true
}));
```

### **Optie 2: Gebruik Statische Data**

Gewoon niets doen! Website werkt perfect met fallback data op GitHub Pages.

## 📝 Data Updaten (Productie)

Als je geen CMS backend in productie hebt:

1. Update data in CMS (lokaal)
2. Export data uit `cms/database/db.json`
3. Update `FALLBACK_DATA` in `js/data.js`
4. Commit en push naar GitHub
5. GitHub Pages update automatisch

## 🎉 Voordelen

✅ **Lokaal:** Dynamische data van CMS
✅ **Productie:** Werkt zonder CMS server
✅ **Automatisch:** Detecteert omgeving
✅ **Fallback:** Altijd werkende website
✅ **Eenvoudig:** Geen handmatige configuratie

## 📚 Samenvatting

| Omgeving | Data Bron | CMS Nodig? | Update Methode |
|----------|-----------|------------|----------------|
| **Lokaal** | CMS API | ✅ Ja | Real-time via CMS |
| **GitHub Pages** | Fallback | ❌ Nee | Git commit |
| **Productie + CMS** | CMS API | ✅ Ja | Real-time via CMS |

**De website werkt altijd, met of zonder CMS!** 🚀
