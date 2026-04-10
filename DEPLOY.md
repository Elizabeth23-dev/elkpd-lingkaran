# Panduan Deploy ke GitHub Pages

## Persiapan Sekali (One-time Setup)

### 1. Buat Repository di GitHub
- Buat repo baru di GitHub (contoh: `e-lkpd-lingkaran`)
- Push semua file project ini ke branch `main`

### 2. Aktifkan GitHub Pages
- Buka repo di GitHub → **Settings** → **Pages**
- Source: pilih **GitHub Actions**

### 3. Buat GitHub Actions Workflow
Buat file `.github/workflows/deploy.yml` di repository GitHub dengan isi:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Buat 404.html dengan SPA redirect
        run: |
          cat > build/client/404.html << 'EOF'
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Redirecting...</title>
              <script>
                var l = window.location;
                l.replace(
                  l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
                  '/elkpd-lingkaran/' +
                  '?p=/' + l.pathname.slice(1).replace(/\/$/,'') +
                  (l.search ? '&q=' + l.search.slice(1) : '') +
                  l.hash
                );
              </script>
            </head>
            <body>Redirecting...</body>
          </html>
          EOF

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: build/client

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Base Path
`vite.config.ts` sudah dikonfigurasi dengan `base: "/elkpd-lingkaran/"` sesuai URL GitHub Pages `https://elizabeth23-dev.github.io/elkpd-lingkaran/`.

## Cara Deploy
Setelah setup selesai, cukup:
```bash
git add .
git commit -m "update"
git push origin main
```
GitHub Actions akan otomatis build dan deploy. Lihat progresnya di tab **Actions** di GitHub.

## Catatan
- File `build/client/404.html` (salinan dari `index.html`) diperlukan agar semua route seperti `/login`, `/materi/:id`, dll. tetap bisa diakses langsung tanpa 404.
- Project sudah dikonfigurasi dalam **SPA mode** sehingga output build berupa static files murni.
