# Website

A React + Vite + Tailwind CSS website.

## Getting Started (VS Code)

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [VS Code](https://code.visualstudio.com/)

### Recommended VS Code Extensions
- **ES7+ React/Redux/React-Native snippets** — fast component scaffolding
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **Prettier** — code formatting
- **ESLint** — linting

### Install & Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the built site locally
```

## Project Structure

```
├── src/
│   ├── pages/          # Page components (HomePage, AboutPage, etc.)
│   ├── components/     # Shared UI components
│   │   └── ui/         # shadcn/ui base components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.jsx         # Routes setup
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles + Tailwind
├── public/             # Static assets
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Deploying to GitHub Pages

### First-time setup

1. Push this project to a GitHub repository.

2. If deploying to a **project site** (e.g. `https://yourusername.github.io/my-repo/`), update `vite.config.js`:
   ```js
   base: '/my-repo/',  // replace with your repo name
   ```
   If deploying to a **user/org site** (e.g. `https://yourusername.github.io/`), leave it as `base: '/'`.

3. In your GitHub repo → **Settings** → **Pages** → set **Source** to **GitHub Actions**.

4. Push to the `main` branch — the workflow in `.github/workflows/deploy.yml` will build and deploy automatically.

### Updating the site
Every push to `main` triggers a new deployment. That's it.

## Editing Pages

Each page lives in `src/pages/`. Edit the `.jsx` files there to update content.
The navigation links and routes are in `src/App.jsx` and `src/components/Header.jsx`.
