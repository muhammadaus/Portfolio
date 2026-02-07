# Portfolio

A personal portfolio website showcasing projects, skills, and blog posts.

## Overview

This is a static HTML/CSS/JS portfolio site with:
- Responsive design
- Project showcases
- Blog posts (Git, Vim, AI Agents)
- Multi-language support (English/Japanese)

## Structure

```
├── index.html          # Main portfolio page
├── index_ja.html       # Japanese version
├── blog/               # Blog posts directory
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── img/                # Images and assets
├── vendor/             # Third-party libraries
└── visualizations/     # Data visualizations
```

## Local Development

This is a static site - no build step required. To run locally:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is deployed automatically via GitHub Pages or Netlify on push to `master`.

## Blog Posts

- `agents-blog.html` - AI Agents and Automation
- `git-blog.html` - Git Workflows and Best Practices  
- `vim-blog.html` - Vim Tips and Configuration

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Security

See [SECURITY.md](./SECURITY.md) for security policy.

## License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) for details.
