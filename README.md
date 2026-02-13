# Portfolio

Personal portfolio website showcasing projects and skills.

## Overview

A static HTML portfolio site with:
- Responsive design for all devices
- Multiple language support (English & Japanese)
- Blog posts on technical topics
- Project visualizations

## Structure

```
Portfolio/
├── index.html          # Main portfolio page
├── index_ja.html       # Japanese version
├── blog/               # Blog articles
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── img/                # Images and assets
├── visualizations/     # Data visualizations
└── vendor/             # Third-party libraries
```

## Local Development

Simply open `index.html` in your browser:

```bash
# Option 1: Direct file open
open index.html

# Option 2: Simple HTTP server (Python)
python3 -m http.server 8000

# Option 3: Simple HTTP server (Node.js)
npx serve .
```

Then visit `http://localhost:8000`

## Deployment

This is a static site that can be deployed to any static hosting:
- **GitHub Pages**: Push to `master` branch
- **Netlify**: Connect repo, auto-deploys on push
- **Vercel**: Connect repo, auto-deploys on push
- **Cloudflare Pages**: Connect repo, auto-deploys on push

## Security

Security headers are configured in `_headers` for Netlify/Cloudflare deployments.

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
