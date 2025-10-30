Indian Army Pension Calculator – 2025
-------------------------------------

This ZIP contains a mobile-friendly frontend for testing on GitHub Pages or local file server.
It is intended for initial testing. Critical production-level protection requires server-side logic.

Files:
- index.html          (Main UI)
- jobs.html           (Jobs after retirement)
- css/styles.css      (Styling)
- js/commutation_table.js  (Commutation factors)
- js/app.js           (Computation logic)
- js/security.js      (Right-click / F12 deterrent)
- js/ads.js           (AdSense placeholders)
- img/army-placeholder.png (Placeholder image)
- .htaccess           (Disable directory listing on Apache)

How to test locally:
1. Unzip the folder.
2. Open index.html in a browser (double click). For full testing, host via a simple static server:
   - Python 3: `python -m http.server 8000` in the folder, then visit http://localhost:8000
3. To push to GitHub:
   - git init
   - git add .
   - git commit -m "Initial pension frontend"
   - git branch -M main
   - git remote add origin <your-repo>
   - git push -u origin main
4. GitHub Pages can serve the site (but only static client-side).
5. For Hostinger deployment:
   - If you have Node support, implement server-side compute as earlier discussed.
   - If using shared hosting, upload the contents of the folder to public_html (or the document root) via FTP/File Manager.

Notes:
- Date format used is Indian standard (dd/mm/yyyy) in labels. HTML date inputs use browser native date picker.
- Computations are performed client-side here for testing. For security move computation to server.
- Replace ad placeholders with your AdSense code once approved.
