# Logo Files

Place your logo files in this `public` folder.

## Recommended Files:

1. **`logo.svg`** - Main logo (used in navigation and footer)
   - Should be an SVG for best quality and scalability
   - Recommended size: Square format (e.g., 512x512px or similar)

2. **`favicon.svg`** or **`favicon.ico`** - Browser tab icon
   - Small icon that appears in browser tabs
   - Can be the same as logo.svg or a simplified version

## File Formats Supported:

- **SVG** (recommended) - `/logo.svg`
- **PNG** - `/logo.png` 
- **JPG/JPEG** - `/logo.jpg`

## Usage in Code:

Files in the `public` folder are served from the root URL:
- `/logo.svg` → Accessible at `https://yoursite.com/logo.svg`
- `/logo.png` → Accessible at `https://yoursite.com/logo.png`

The code is already set up to use `/logo.svg`. If you use a different filename or format, update:
- `src/App.tsx` (navigation and footer logo references)
- `index.html` (favicon reference)

