
pool-live – Bilder für die Slideshow

• Pfad in Repo: /library/images/pool-live/
• Dateinamen: slide-01.jpg … slide-99.jpg (nur .jpg/.jpeg/.png, klein geschrieben)
• Diese ZIP enthält deine aktuell verfügbaren Bilder (wir haben hier 10 Dateien normalisiert).
• Du kannst jederzeit weitere Bilder hinzufügen – einfach 'slide-XX.jpg' benennen und hochladen.

Aktivierung in der App (haben wir bereits so gebaut):
• /library/images/index.json zeigt auf 'library/images/pool-live/' und lässt jpg/jpeg/png zu.
• Slideshow-Set '/library/sets/sample-01.json' nutzt /library/images/index.json als Quelle.

Upload im Browser (GitHub):
1) In: library/images/ (links) → prüfe, ob 'pool-live' existiert. Falls nicht, einfach mit Upload anlegen.
2) Button "Add file" → "Upload files" → kompletten Inhalt aus 'library/images/pool-live/' hochladen.
3) Commit-Text (Vorschlag): images: add pool-live (10 files, normalized)
