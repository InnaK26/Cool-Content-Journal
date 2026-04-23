# Vorlesungsjournal (GitHub Pages + Jekyll)

## Inhalte bearbeiten
- Vorlesungen liegen in `_lectures/` als `.md` Dateien.
- Neue Vorlesung: Datei kopieren oder neue `.md` anlegen.
- Löschen: Datei entfernen.

## Bilder / Videos
- Bilder/MP4s nach `assets/uploads/` hochladen.
- Dann in der Vorlesung referenzieren:
  - Bild im Text: `![Alt-Text](/assets/uploads/datei.jpg)`
  - Cover im Frontmatter: `cover: "/assets/uploads/datei.jpg"`
  - Video einbetten: `video_url: "https://youtube.com/watch?v=..."`
  - MP4 lokal: `video_file: "/assets/uploads/meinvideo.mp4"`

## GitHub Pages aktivieren
- Repo → Settings → Pages
- Source: `Deploy from a branch`
- Branch: `main` / Folder: `/ (root)`
- GitHub baut Jekyll automatisch und veröffentlicht die Seite.
