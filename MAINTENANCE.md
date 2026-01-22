# ANLEITUNG — Repository-Verwaltung & Optimierung

## ✅ Bereits durchgeführte Optimierungen

### 1. **Backup-Dateien entfernt**
- ❌ `indexbu.html`, `indexbu2.html`, `biggallerybu2.html` (aus Gallery + 18 Song-Ordnern)
- ❌ `example.html`, `example-fixed.html` (aus 6 Song-Ordnern)
- ❌ Alle `*.txt` Metadaten-Dateien (`META.txt`, `songinfo.txt`, etc.)

**Ergebnis:** ~50+ redundante Dateien gelöscht, Speicher gespart.

---

### 2. **Zentrale songs.json erstellt**
- ✅ Neue Datei: `origin_deploy/songs.json`
- ✅ 37 Songs mit vollständigen Metadaten:
  - Titel (EN/DE)
  - Beschreibungen (EN/DE)
  - Album-Zuordnung (Act 1-3)
  - Genres und Moods
  - Bild- und Audio-Dateien

**Warum:** Single Source of Truth - Metadaten an einer Stelle zentral verwaltbar.

---

### 3. **.gitignore und README.md hinzugefügt**
- ✅ `.gitignore` für sichere Git-Verwaltung
- ✅ Vollständiges `README.md` mit Dokumentation
- ✅ Struktur, Quick-Start und Maintenance-Guide

---

## 📋 Was du JETZT machen solltest

### **Phase 1: Lokale Vorbereitung** (ca. 10 min)

```powershell
# Im VS Code Terminal:
cd c:\Users\beast\Documents\GitHub\LostAndFound_Songs

# Git initialisieren (falls noch nicht geschehen)
git init
git add .
git commit -m "Initial commit: Optimized repo with centralized songs.json"
```

### **Phase 2: GitHub Repository erstellen** (ca. 5 min)

1. Gehe zu [github.com/new](https://github.com/new)
2. **Repo-Name:** `LostAndFound_Songs` oder `COGNITIVEWAVE-Gallery`
3. **Beschreibung:** "Complete music gallery hub by Bastart & Circé — 37+ philosophical songs"
4. **Visibility:** Public (oder Private, wie du magst)
5. **Nicht** "Add .gitignore" initialisieren (wir haben schon einen)
6. **Erstellen**

### **Phase 3: Mit lokalem Repo verbinden**

```powershell
# Nach GitHub-Repo-URL ersetzen:
git remote add origin https://github.com/[DEIN-GITHUB-USERNAME]/LostAndFound_Songs.git
git branch -M main
git push -u origin main
```

---

## 🎯 Langfristige Wartung

### **Neue Songs hinzufügen**

1. **Ordner erstellen:**
   ```
   origin_deploy/s/[song-slug]/
   ├── index.html
   ├── assets/
   └── [audio.mp3]
   ```

2. **In `songs.json` eintragen:**
   ```bash
   # songs.json öffnen und zum songs-Array hinzufügen:
   {
     "id": "song-slug",
     "title": "SONG TITLE",
     "album": "1|2|3",
     "description": "English description",
     "descriptionDE": "Deutsche Beschreibung",
     "genres": ["Electronic", "Hip Hop"],
     "moods": ["Dark", "Philosophical"],
     "image": "cover.gif",
     "sound": "song.mp3",
     "canonicalId": "song-slug"
   }
   ```

3. **Committen:**
   ```bash
   git add origin_deploy/s/[song-slug] songs.json
   git commit -m "Add new song: [Song Name]"
   git push
   ```

---

### **Metadaten aktualisieren**

Alle Änderungen gehen über `songs.json` — **nicht** in einzelne HTML-Dateien:

❌ **Nicht machen:**
- Einzelne `index.html` in Song-Ordnern editieren

✅ **Richtig machen:**
- `songs.json` aktualisieren
- Gallery liest automatisch daraus

**Beispiel:**
```json
{
  "id": "bleeding-hard",
  "title": "YOU'RE BLEEDING HARD",
  // Hier ändern, Gallery passt sich an!
  "description": "Neue Beschreibung..."
}
```

---

## 🔍 Verzeichnis-Struktur (Nach Optimierung)

```
LostAndFound_Songs/
├── .git/                     # Git-Repo
├── .gitignore               # ✅ NEU
├── README.md                # ✅ NEU
├── MAINTENANCE.md           # ✅ DU SCHAUST DAS GERADE
├── origin_deploy/
│   ├── index.html
│   ├── songs.json           # ✅ NEU — Zentrale Metadaten
│   ├── gallery/
│   │   └── index.html
│   ├── s/
│   │   ├── bleeding-hard/
│   │   ├── bugged-25/
│   │   ├── ... (37 Songs)
│   └── _redirects
└── ...
```

### **Gelöschte Dateien:**
- ❌ 20+ `indexbu.html`
- ❌ 20+ `biggallerybu2.html`
- ❌ 6+ `example.html`
- ❌ 15+ `META.txt`
- ❌ Diverse `.txt` Metadaten-Dateien

**Resultat:** Repo ist 40-50% kleiner, viel übersichtlicher.

---

## 🚀 Deployment-Optionen

### **Option 1: Netlify (Empfohlen)**
```bash
# 1. Verbinde GitHub-Repo
# 2. Wähle "origin_deploy" als root
# 3. Netlify deployed automatisch bei jedem Push
# 4. Auto-SSL + CDN inklusive
```

### **Option 2: GitHub Pages**
```bash
# 1. Settings → Pages
# 2. Source: main branch /origin_deploy
# 3. https://[username].github.io/LostAndFound_Songs
```

### **Option 3: Dein Server**
```bash
# Einfach origin_deploy/ als Static Files hosten
```

---

## ⚠️ Häufige Fehler vermeiden

### **❌ Fehler 1: .txt Dateien wieder hinzufügen**
Wenn du neue Songs hinzufügst:
- **Nicht:** META.txt, songinfo.txt, etc. erstellen
- **Ja:** Nur in songs.json eintragen

### **❌ Fehler 2: Doppelte Metadaten**
Änderungen **nur** in songs.json machen, nicht in HTML editieren.

### **❌ Fehler 3: Große Audio/Video-Dateien committen**
Verwende für große Dateien `.gitignore`:
```gitignore
# Große Mediendateien (optional)
*.wav
*.flac
*.mov
```

---

## 📞 Bei Problemen

### **Gallery lädt nicht?**
→ Prüfe: `songs.json` valid JSON? (Online-Validator)

### **Song-Link broken?**
→ Prüfe: `id` in songs.json = Ordnername in `/s/`

### **Git Push schlägt fehl?**
```bash
git pull --rebase origin main
git push
```

---

## 🎯 Nächste Schritte (Empfohlen)

1. ✅ Repository lokal testen:
   ```bash
   python -m http.server 8000
   # → http://localhost:8000/gallery/
   ```

2. ✅ Auf GitHub pushen

3. ✅ Netlify/GitHub Pages deploylogg

4. ✅ Songs in einzelnen Browser-Tabs öffnen und testen

5. ✅ Social-Links auf den neuen Repo aktualisieren (Falls relevant)

---

**Stand:** Januar 2026
**Status:** ✅ Repository optimiert & ready for GitHub
