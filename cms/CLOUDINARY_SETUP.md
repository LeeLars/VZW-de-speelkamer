# Cloudinary Setup Guide

## 🎯 Waarom Cloudinary?

**Probleem**: Uploaded images (team foto's, locatie foto's) werden lokaal opgeslagen en verdwenen bij Railway redeploys.

**Oplossing**: Cloudinary - gratis cloud image storage met automatische optimalisatie!

### Voordelen:
- ✅ **Images blijven permanent bewaard**
- ✅ **Automatische image optimalisatie** (WebP, compression)
- ✅ **Automatische resizing** (max 1200x1200px)
- ✅ **CDN delivery** - super snel wereldwijd
- ✅ **Gratis tier**: 25GB storage, 25GB bandwidth/maand
- ✅ **Geen lokale bestanden** meer nodig

## 🚀 Setup Stappen

### 1. Maak Gratis Cloudinary Account

1. Ga naar: https://cloudinary.com/users/register/free
2. Vul je gegevens in:
   - Email
   - Wachtwoord
   - Cloud name (bijv: `vzw-speelkamer`)
3. Klik **"Create Account"**
4. Bevestig je email

### 2. Haal Je Credentials Op

1. Login op Cloudinary Dashboard
2. Je ziet direct je credentials:
   ```
   Cloud name: vzw-speelkamer
   API Key: 123456789012345
   API Secret: abcdefghijklmnopqrstuvwxyz
   ```
3. **Kopieer deze 3 waarden!**

### 3. Voeg Toe aan Railway

1. Open Railway Dashboard
2. Ga naar je CMS service
3. Klik op **"Variables"**
4. Voeg deze 3 variables toe:

```
CLOUDINARY_CLOUD_NAME=vzw-speelkamer
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

**Let op**: Gebruik je eigen waarden, niet de voorbeelden hierboven!

### 4. Deploy

```bash
cd /Users/larsleenders/Downloads/vzw-de-speelkamer

git add .
git commit -m "Add Cloudinary for cloud image storage"
git push origin main
```

Railway zal automatisch:
1. Cloudinary package installeren
2. Images uploaden naar Cloudinary
3. URLs opslaan in PostgreSQL database

## 📸 Hoe Werkt Het?

### Upload Flow:

1. **User uploadt foto** via CMS
2. **Multer** ontvangt file in memory (geen disk write!)
3. **Cloudinary** upload:
   - Automatisch resize naar max 1200x1200px
   - Automatisch optimaliseren (quality: auto)
   - Automatisch WebP conversie voor browsers die het ondersteunen
4. **Database** slaat Cloudinary URL op
5. **Website** toont image direct van Cloudinary CDN

### Image URLs:

**Voor** (lokaal):
```
./images/uploads/1234567890-abc.jpg
```

**Na** (Cloudinary):
```
https://res.cloudinary.com/vzw-speelkamer/image/upload/v1234567890/vzw-speelkamer/abc123.jpg
```

## 🎨 Image Transformaties

Cloudinary optimaliseert automatisch:

- **Resize**: Max 1200x1200px (behoudt aspect ratio)
- **Quality**: Automatisch geoptimaliseerd per image
- **Format**: WebP voor moderne browsers, JPEG fallback
- **Compression**: Intelligente compressie zonder kwaliteitsverlies

## 💰 Kosten

### Gratis Tier (meer dan genoeg!):
- **Storage**: 25 GB
- **Bandwidth**: 25 GB/maand
- **Transformaties**: 25,000/maand
- **Images**: Onbeperkt aantal

### Geschatte gebruik voor jouw site:
- **Per foto**: ~500KB (na optimalisatie)
- **50 team foto's**: ~25MB
- **100 locatie foto's**: ~50MB
- **Totaal**: ~75MB (0.3% van gratis tier!)

Je zit **ruim binnen de gratis tier**! 🎉

## 🔧 Troubleshooting

### "Invalid credentials" error

- Controleer of alle 3 Cloudinary variables correct zijn ingesteld
- Check voor spaties voor/na de waarden
- Herstart Railway service

### Images uploaden niet

- Check Railway logs: `railway logs`
- Controleer Cloudinary dashboard → Media Library
- Test met kleine image eerst (<1MB)

### Oude lokale images

- Oude images in `images/uploads/` worden niet automatisch gemigreerd
- Upload ze opnieuw via CMS interface
- Of laat ze staan (website gebruikt relatieve paths die nog werken)

## 📊 Cloudinary Dashboard

Bekijk je images op:
https://cloudinary.com/console/media_library

Hier zie je:
- Alle uploaded images
- Storage gebruik
- Bandwidth gebruik
- Transformaties

## 🎯 Volgende Stappen

Na setup:
1. ✅ Upload een test foto via CMS
2. ✅ Check Cloudinary Media Library
3. ✅ Verifieer dat image zichtbaar is op website
4. ✅ Test op mobile
5. ✅ Verwijder oude lokale images (optioneel)

## 🔐 Security

- **API Secret** moet geheim blijven!
- Zet het ALLEEN in Railway environment variables
- Commit het NOOIT naar Git
- Deel het niet met anderen

## 📝 Belangrijke Wijzigingen

### Upload Response:

**Voor**:
```json
{
  "path": "./images/uploads/123.jpg",
  "url": "/uploads/123.jpg"
}
```

**Na**:
```json
{
  "path": "https://res.cloudinary.com/vzw-speelkamer/image/upload/v123/vzw-speelkamer/abc.jpg",
  "url": "https://res.cloudinary.com/vzw-speelkamer/image/upload/v123/vzw-speelkamer/abc.jpg",
  "public_id": "vzw-speelkamer/abc"
}
```

### Database:

- `image_url` kolom slaat nu Cloudinary URLs op
- Oude relatieve paths blijven werken (backwards compatible)

## ✅ Checklist

- [ ] Cloudinary account aangemaakt
- [ ] Credentials gekopieerd
- [ ] Variables toegevoegd aan Railway
- [ ] Code gecommit en gepusht
- [ ] Deploy succesvol
- [ ] Test foto geupload
- [ ] Foto zichtbaar in Cloudinary dashboard
- [ ] Foto zichtbaar op website

Klaar! Geen lokale files meer! 🎉
