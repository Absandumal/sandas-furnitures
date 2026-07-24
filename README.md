# Sandas Furnitures — Full Stack Website

A full stack furniture store website: a Node.js/Express backend serving a
REST API (products + contact form) and a dynamic frontend that fetches
its data from that API instead of hardcoding it in JavaScript.

## What changed from the original

- **Fixed a real bug**: the "View Details" button previously used a
  selector (`.product-bottom button`) that didn't exist in the HTML, so
  the modal never opened. It's now wired correctly.
- **Real backend**: products now live in `data/products.json` and are
  served through `/api/products`. The contact form posts to
  `/api/contact` and is saved to `data/messages.json` (instead of just
  showing a browser `alert()`).
- **Visual upgrade**: new fonts (Fraunces + Inter), Font Awesome icons,
  star ratings, product badges ("New" / "Bestseller"), a stats bar in the
  hero, an "About" badge, a testimonials section, loading states, and
  smoother hover/fade-in animations.
- **Cleaner code**: fixed the broken/duplicated `<div>` nesting in the
  original product cards HTML.

## Project structure

```
sandas-furnitures/
├── server.js              # Express server
├── package.json
├── .env.example
├── data/
│   ├── products.json       # Product catalogue (edit this to add/remove products)
│   └── messages.json       # Contact form submissions get saved here
├── routes/
│   ├── products.js         # GET /api/products, GET /api/products/:id
│   └── contact.js          # POST /api/contact
└── public/
    ├── index.html
    ├── css/style.css
    └── js/script.js
```

## Steps to copy this into your VS Code project folder

1. **Download and unzip** the `sandas-furnitures.zip` file I've given you.
2. **Open VS Code**, then `File → Open Folder...` and select the
   unzipped `sandas-furnitures` folder. (Or drag the folder onto the
   VS Code icon.)
3. **Open a terminal inside VS Code**: `Terminal → New Terminal`.
4. **Install Node.js** if you don't already have it: download the LTS
   version from https://nodejs.org and install it, then restart VS Code.
5. **Install dependencies** — in the VS Code terminal, run:
   ```bash
   npm install
   ```
6. **Start the server**:
   ```bash
   npm start
   ```
   You should see: `Sandas Furnitures server running at http://localhost:3000`
7. **Open the site**: go to `http://localhost:3000` in your browser.
8. (Optional, for auto-reload while you edit) run `npm run dev` instead
   of `npm start` — this uses `nodemon`, which restarts the server
   automatically whenever you save a file.

## Editing your products

Open `data/products.json` and add, remove, or edit entries — no code
changes needed. Each product needs: `id`, `name`, `category` (must match
one of `sofa`, `bed`, `wardrobe`, `table`, or a new category you also add
a filter button for in `index.html`), `price`, `rating`, `badge` (can be
an empty string), `image` (a URL), and `description`.

## Viewing contact form submissions

Every submitted enquiry is appended to `data/messages.json` with a
timestamp. To get real email notifications instead, you'd add the
`nodemailer` package and a few lines in `routes/contact.js` — happy to
wire that up if you tell me which email provider you want to use.

## Deploying it live

This is a normal Node/Express app, so it deploys to any Node host:
Render, Railway, Vercel (with adjustments), or a VPS. The general steps
are: push the folder to a GitHub repo, connect that repo to the hosting
provider, set the start command to `npm start`, and set the `PORT`
environment variable if the host requires it.
