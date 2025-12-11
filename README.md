# Unstacked Apps Landing Page

A modern, single-page landing site for Unstacked Apps LLC built with React, Vite, TypeScript, and shadcn/ui components.

## Features

- ⚡️ Built with Vite for fast development and builds
- ⚛️ React 19 with TypeScript
- 🎨 shadcn/ui components with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Optimized for GitHub Pages deployment

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Update the base path in `vite.config.ts`:**
   - If your repository name is `unstackedapps-main-site`, the base path should be `/unstackedapps-main-site/`
   - If your repository name is different, update the `VITE_BASE_PATH` in `.github/workflows/deploy.yml` or set it as an environment variable

3. **Push to main branch:**
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at `https://[username].github.io/[repository-name]/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Set the base path (replace with your repository name)
export VITE_BASE_PATH=/unstackedapps-main-site/

# Build
npm run build

# The dist folder can be deployed to GitHub Pages
```

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
└── public/              # Static assets
```

## Customization

- Update the content in `src/App.tsx` to customize the landing page
- Modify colors and styling in `src/index.css` (CSS variables)
- Add more shadcn/ui components as needed

## License

© 2024 Unstacked Apps LLC. All rights reserved.
