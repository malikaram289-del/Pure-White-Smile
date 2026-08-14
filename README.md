# Pure White Smile — Organic Tooth Powder Website

A complete, mobile-friendly website for your organic tooth powder business, plus a
simple admin panel for editing content yourself — no coding required.

## What's in this folder

```
index.html        → the website itself
admin.html         → the admin panel (edit content here)
config.js          → all your editable text, price, and image paths
css/style.css       → site design
css/admin.css       → admin panel design
js/main.js          → makes the site read from config.js
js/admin.js         → makes the admin panel work
images/             → product & about photos (placeholders included)
```

## 1. Try it on your computer first

Just double-click `index.html` — it opens in your browser. Double-click `admin.html`
to try the admin panel.

## 2. Edit your content with the Admin Panel

1. Open `admin.html` in your browser.
2. Change your product name, price, description, images, WhatsApp number, contact
   details, and page text using the form.
3. Watch the **Live Preview** card on the right update as you type.
4. Click **Download config.js** — your browser will save an updated `config.js` file
   (usually to your Downloads folder).
5. Replace the old `config.js` in this project folder with the new downloaded one.
6. Open `index.html` to confirm the changes look right.

**Important:** the admin panel only edits the `config.js` file on your own computer.
It does **not** change your live website by itself — you still need to upload the new
`config.js` to GitHub (step 4 below) for visitors to see the changes.

### Adding product photos
In the admin panel, either:
- Paste a link to an image already hosted online (e.g. an image URL from Google Drive,
  Imgur, or your Instagram), **or**
- Click "Or upload a photo from your device" to embed the photo directly — this is the
  simplest option and needs no separate image hosting.

If you'd rather manage image files directly: drop your photo into the `images/` folder
(e.g. `images/product.jpg`) and type `images/product.jpg` into the image field.

## 3. Publish for free on GitHub Pages

You don't need any hosting or server — GitHub Pages hosts this for free.

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.
2. **Create a new repository**
   - Click the **+** icon (top right) → **New repository**
   - Name it something like `tooth-powder-website`
   - Set it to **Public**
   - Click **Create repository**
3. **Upload your files**
   - On your new repository page, click **Add file → Upload files**
   - Drag in *all* the files and folders from this project (`index.html`, `admin.html`,
     `config.js`, the `css` folder, the `js` folder, the `images` folder, this `README.md`)
   - Scroll down and click **Commit changes**
4. **Turn on GitHub Pages**
   - Go to your repository's **Settings** tab
   - Click **Pages** in the left sidebar
   - Under "Build and deployment" → **Source**, choose **Deploy from a branch**
   - Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**
5. **Wait 1–2 minutes**, then refresh the Pages settings page. GitHub will show you your
   live website address, something like:
   `https://yourusername.github.io/tooth-powder-website/`
6. Your site is now live! Share this link with customers, on WhatsApp status, or on
   Instagram.

### Updating the live site later
Whenever you want to change your price, text, or images:
1. Edit with `admin.html` and download the new `config.js` (or edit it directly, or
   add a new image to `images/`).
2. Go back to your GitHub repository, open the file (e.g. `config.js`), click the
   pencil/edit icon, paste in the new content, and click **Commit changes** — or use
   **Add file → Upload files** to overwrite it.
3. Your live site updates automatically within a minute or two.

## 4. Setting your WhatsApp number correctly

In `admin.html`, enter your WhatsApp number in international format **without** the
`+` sign or spaces — for example a Pakistani mobile `0300-1234567` becomes:

```
923001234567
```

This is used to build your "Order on WhatsApp" links across the site.

## 5. Using your own domain name (optional)

If you buy a domain (e.g. from Namecheap or GoDaddy), you can point it at your GitHub
Pages site: in repository **Settings → Pages**, enter your domain under **Custom domain**,
then follow GitHub's on-screen DNS instructions.

## Notes on this admin panel

This is a lightweight, no-backend admin tool designed for GitHub Pages (which can only
host static files, not databases). It's ideal for a small business that updates its
price, description, or photos occasionally. If your business grows and you want changes
to appear live the instant you save (without re-uploading a file), you'd eventually
want a proper backend or a platform like Shopify — but for a simple, free, professional
storefront, this setup works very well.
