# Sandas Furnitures — Full Stack Website

A full stack furniture store website: a Node.js/Express backend serving a
REST API (products + contact form) and a dynamic frontend that fetches
its data from that API instead of hardcoding it in JavaScript.

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


