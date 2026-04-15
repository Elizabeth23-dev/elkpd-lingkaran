# Panduan Deploy ke GitHub Pages (Custom Domain)

## ⚠️ Catatan Penting
Project ini sudah dikonfigurasi untuk custom domain (bukan GitHub Pages sub-path).
- `vite.config.ts` menggunakan `base: "/"` (root domain)
- File `public/CNAME` berisi nama domain Anda

## Langkah Setup

### 1. Beli Domain
Beli domain di Niagahoster, Domainesia, atau GoDaddy.
Contoh: `elkpd-lingkaran.com`

### 2. Setting DNS di Panel Domain
**Jika pakai domain utama (`www.domainanda.com`):**
```
Type: CNAME
Name: www
Value: elizabeth23-dev.github.io
```

**Jika pakai subdomain (`elkpd.domainanda.com`):**
```
Type: CNAME
Name: elkpd
Value: elizabeth23-dev.github.io
```

Tunggu propagasi DNS: biasanya 10–30 menit, maksimal 24 jam.

### 3. Update file CNAME
Ganti isi file `public/CNAME` dengan domain Anda yang sebenarnya.
Contoh:
```
www.domainanda.com
```
Atau:
```
elkpd.domainanda.com
```

### 4. Aktifkan GitHub Pages
- Buka repo di GitHub → **Settings** → **Pages**
- Source: pilih **GitHub Actions**
- Di bagian "Custom domain": ketik domain Anda → Save
- Centang **Enforce HTTPS** (setelah domain sudah tersambung)

### 5. Buat GitHub Actions Workflow
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

      - name: Buat 404.html untuk SPA routing
        run: |
          if [ -f build/client/__spa-fallback.html ]; then
            cp build/client/__spa-fallback.html build/client/404.html
          else
            cp build/client/index.html build/client/404.html
          fi

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

### 6. Push Project ke GitHub
Setelah extract ZIP dari Dazl, buka terminal di folder project:
```bash
git init
git remote add origin https://github.com/Elizabeth23-dev/elkpd-lingkaran.git
git add .
git commit -m "deploy: ELKPD Lingkaran dengan custom domain"
git push origin main --force
```

GitHub Actions akan otomatis build dan deploy (~2-3 menit).
Cek tab **Actions** di GitHub untuk melihat progress.

## Cara Update (Setelah Setup Selesai)
Cukup push ke GitHub:
```bash
git add .
git commit -m "update"
git push origin main
```

## Catatan
- File `public/CNAME` wajib ada agar GitHub Pages mengarahkan domain ke repo ini
- `404.html` diperlukan agar semua route (login, materi, admin) bisa diakses langsung tanpa error 404
- Project sudah dalam **SPA mode** — output build berupa static files murni
