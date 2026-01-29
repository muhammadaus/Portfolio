# Muhammad Aus Hijri - Portfolio

Personal portfolio website showcasing projects, skills, and blog posts.

## 🌐 Live Site

Visit the portfolio at the deployed URL.

## 📁 Structure

```
├── index.html          # Main portfolio page (English)
├── index_ja.html       # Japanese version
├── blog/               # Blog post directory
│   └── ...
├── agents-blog.html    # Blog: AI Agents
├── git-blog.html       # Blog: Git workflows
├── vim-blog.html       # Blog: Vim tips
├── css/                # Stylesheets
├── js/                 # JavaScript
├── img/                # Images and assets
├── visualizations/     # Interactive visualizations
└── _headers            # Security headers (Netlify/Cloudflare)
```

## 🚀 Local Development

This is a static HTML site - no build step required.

```bash
# Clone the repository
git clone https://github.com/muhammadaus/Portfolio.git
cd Portfolio

# Serve locally (pick one)
npx serve .
# or
python -m http.server 8000
# or just open index.html in a browser
```

## 🔒 Security

Security headers are configured in `_headers` for deployment platforms:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## 🌍 Internationalization

- English: `index.html`
- Japanese: `index_ja.html`

## 📝 Blog Posts

Technical blog posts covering:
- AI/ML and autonomous agents
- Git workflows and best practices
- Vim productivity tips

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
