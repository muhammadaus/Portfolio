# Portfolio

A personal portfolio website showcasing projects and blog posts.

## 🌐 Live Site

Visit the live portfolio at the deployed URL.

## 📁 Project Structure

```
├── index.html           # Main portfolio page
├── index_ja.html        # Japanese version
├── modern-portfolio.html # Alternative modern design
├── css/                 # Stylesheets
├── js/                  # JavaScript files
├── img/                 # Images and assets
├── blog/                # Blog post pages
├── visualizations/      # Data visualizations
├── _headers             # Netlify/Cloudflare headers
└── vendor/              # Third-party libraries
```

## 🚀 Deployment

This is a static HTML site that can be deployed to any static hosting service:

### Option 1: Netlify
Simply drag and drop the folder to [Netlify](https://netlify.com) or connect your Git repository.

### Option 2: GitHub Pages
Enable GitHub Pages in repository settings, pointing to the root directory.

### Option 3: Vercel
Connect your repository to [Vercel](https://vercel.com) for automatic deployments.

### Option 4: Local Development
Open any HTML file directly in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📄 Pages

| Page | Description |
|------|-------------|
| `index.html` | Main portfolio landing page |
| `index_ja.html` | Japanese language version |
| `modern-portfolio.html` | Alternative modern design |
| `agents-blog.html` | Blog post about AI agents |
| `git-blog.html` | Blog post about Git |
| `vim-blog.html` | Blog post about Vim |

## 🛡️ Security Headers

The `_headers` file configures security headers for platforms like Netlify:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please see [SECURITY.md](SECURITY.md).
