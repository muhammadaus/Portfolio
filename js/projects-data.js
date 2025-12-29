/**
 * Projects Data Configuration
 * All portfolio project metadata
 */

const projectsData = {
    // Featured projects (top 6 highlighted projects)
    featured: [
        {
            id: "jobsearchagent",
            title: "JobSearchAgent",
            category: ["fullstack", "ai"],
            description: "Automated job search across 15+ platforms with AI-powered filtering and recruiter outreach",
            longDescription: "A sophisticated multi-role job search automation tool that scrapes 15+ job boards including LinkedIn, Indeed, RemoteOK, Web3.Career, and CryptoJobsList. Features 8 configurable roles, anti-bot detection bypassing, company list generation for recruiter targeting, and automated LinkedIn profile scraping. Saves 100+ hours per month by automating job discovery and application processes.",
            techStack: ["Node.js", "Puppeteer", "JavaScript", "Axios", "Chrome Extension"],
            features: [
                "15+ job board integrations",
                "8 configurable job roles",
                "Anti-detection technology with stealth plugins",
                "LinkedIn automation and message reading",
                "Company extraction for recruiter outreach",
                "Email discovery via Skrapp API integration",
                "Session persistence to reduce login frequency"
            ],
            highlights: ["15+ platforms", "8 roles", "100+ hrs saved/month"],
            githubRepo: "muhammadaus/JobSearchAgent",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2025
        },
        {
            id: "rent2own",
            title: "Rent2Own NFT Platform",
            category: ["defi", "blockchain"],
            description: "NFT rental platform with innovative ownership transition mechanisms built on Taiko blockchain",
            longDescription: "A decentralized platform that enables users to rent NFTs with an option to purchase them over time. Built on Taiko blockchain with an innovative approach to NFT accessibility and ownership models. Features smart contract-based rental agreements, automated payment schedules, and seamless ownership transfers.",
            techStack: ["Solidity", "React", "Web3.js", "Next.js", "Ethers.js", "Hardhat"],
            features: [
                "NFT rental with rent-to-own option",
                "Smart contract escrow system",
                "Automated payment scheduling",
                "Ownership transition mechanics",
                "Multi-chain support",
                "Integrated wallet connections"
            ],
            highlights: ["Taiko Blockchain", "DeFi Innovation", "NFT Rentals"],
            githubRepo: "muhammadaus/Rent2Own",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/project_6.png",
            status: "completed",
            year: 2024
        },
        {
            id: "shadowswap",
            title: "ShadowSwap AMM",
            category: ["defi", "blockchain"],
            description: "ETH Tokyo 2024 hackathon winner - Automated Market Maker with privacy features",
            longDescription: "An innovative AMM (Automated Market Maker) built during ETH Tokyo 2024 hackathon that incorporates privacy-preserving features for DeFi trading. Implements constant product formula with enhanced liquidity provision mechanisms and low-slippage swaps. Won recognition for technical implementation and user experience design.",
            techStack: ["Solidity", "React", "TypeScript", "Web3.js", "Hardhat", "Subgraph"],
            features: [
                "Privacy-preserving swap mechanisms",
                "Constant product AMM formula",
                "Liquidity pool management",
                "Low-slippage trading",
                "Real-time price oracle integration",
                "Gas-optimized smart contracts"
            ],
            highlights: ["ETH Tokyo 2024 Winner", "Privacy-First", "AMM Protocol"],
            githubRepo: "muhammadaus/ShadowSwap",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/project_4.png",
            status: "completed",
            year: 2024
        },
        {
            id: "cipherlogicxyz",
            title: "CipherLogicXYZ Landing",
            category: ["frontend"],
            description: "High-performance landing page with 95+ Lighthouse scores through advanced optimization",
            longDescription: "A modern landing page optimized for maximum performance using code-splitting, lazy loading, and advanced caching strategies. Achieved 95+ scores across all Lighthouse metrics through careful bundle size optimization, image optimization, and efficient resource loading. Implements progressive enhancement and modern web performance best practices.",
            techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
            features: [
                "Code-splitting and lazy loading",
                "Route-based chunking",
                "Heavy component lazy loading",
                "95+ Lighthouse performance score",
                "Image optimization and responsive images",
                "Progressive web app capabilities",
                "SEO optimized with metadata"
            ],
            highlights: ["95+ Lighthouse", "Performance Optimized", "Modern Stack"],
            githubRepo: "muhammadaus/CipherLogicXYZ",
            liveUrl: "https://cipherlogicxyz.vercel.app",
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "prvt",
            title: "PRVT Social Network",
            category: ["blockchain", "fullstack"],
            description: "Privacy-focused social network for builders with secure authentication and encrypted communications",
            longDescription: "A decentralized social networking platform designed for the builder community with privacy as the core principle. Features login verification for enhanced security, encrypted peer-to-peer messaging, and decentralized identity management. Built using modern full-stack technologies with Web3 integration for wallet-based authentication.",
            techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Web3.js", "IPFS"],
            features: [
                "Wallet-based authentication",
                "Login verification system",
                "Encrypted messaging",
                "Decentralized identity (DID)",
                "Privacy-preserving social graphs",
                "IPFS content storage",
                "Community-driven governance"
            ],
            highlights: ["Privacy-First", "Web3 Auth", "Builder Community"],
            githubRepo: "muhammadaus/PRVT",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/project_5.png",
            status: "in-progress",
            year: 2024
        },
        {
            id: "analytics-suite",
            title: "Data Analytics Suite",
            category: ["analytics"],
            description: "Interactive market capitalization tiles and Ethereum price insights with real-time data visualization",
            longDescription: "A collection of custom-built data visualization tools featuring a Market Capitalization dashboard with interactive tiles (visualizing global asset classes including crypto, stocks, bonds, real estate) and an enhanced Ethereum Price Action dashboard (tracking price movements, volatility, volume, RSI, support/resistance levels). Built with Chart.js, real-time APIs, and advanced SQL analytics for comprehensive market insights.",
            techStack: ["JavaScript", "Chart.js", "SQL", "CoinGecko API", "HTML5", "CSS3"],
            features: [
                "Real-time market cap tiles for global asset classes",
                "Ethereum price analysis with volatility tracking",
                "RSI momentum indicators and trend analysis",
                "Support/resistance level identification",
                "Interactive charts with 365-day historical data",
                "Advanced Dune SQL queries for on-chain metrics",
                "Auto-refreshing dashboards every 5 minutes"
            ],
            highlights: ["Live Data Feeds", "ETH Insights", "Market Cap Tiles"],
            githubRepo: null,
            liveUrl: "./visualizations/market-cap-tiles.html",
            demoUrl: "./visualizations/eth-insights.html",
            image: "./img/projects/project_7.png",
            status: "completed",
            year: 2023
        }
    ],

    // All projects (including featured + additional)
    all: [
        // Blockchain/Web3 Projects
        {
            id: "kai-sign",
            title: "Kai-Sign",
            category: ["blockchain", "devtools"],
            description: "Smart contract signing system with MetaMask Snaps integration for enhanced transaction clarity",
            longDescription: "A comprehensive smart contract interaction tool that provides clear signing interfaces for blockchain transactions. Integrates with MetaMask Snaps to display human-readable transaction data, implements ERC-7730 standard for clear signing, and provides developer-friendly APIs for contract interaction.",
            techStack: ["TypeScript", "React", "Solidity", "MetaMask Snaps", "Ethers.js"],
            features: [
                "Clear signing interfaces",
                "ERC-7730 standard implementation",
                "MetaMask Snaps integration",
                "Human-readable transaction display",
                "Multi-chain support",
                "Developer SDK"
            ],
            highlights: ["MetaMask Snaps", "ERC-7730", "Clear Signing"],
            githubRepo: "muhammadaus/Kai-Sign",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "erc7730",
            title: "ERC7730 Implementation",
            category: ["blockchain"],
            description: "Reference implementation of ERC-7730 standard for clear contract signing",
            longDescription: "A complete reference implementation of the ERC-7730 standard, which defines a format for clear signing of smart contract transactions. Provides libraries, tools, and documentation for integrating clear signing into Web3 applications, improving user understanding of transaction consequences.",
            techStack: ["Solidity", "TypeScript", "Hardhat", "OpenZeppelin"],
            features: [
                "ERC-7730 standard compliance",
                "Clear signing message formatting",
                "Developer libraries and SDKs",
                "Integration examples",
                "Testing framework",
                "Comprehensive documentation"
            ],
            highlights: ["ERC Standard", "Clear Signing", "Developer Tools"],
            githubRepo: "muhammadaus/ERC7730",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "scrollsync",
            title: "ScrollSync",
            category: ["blockchain"],
            description: "Blockchain synchronization tool for Scroll L2 network data indexing",
            longDescription: "A high-performance blockchain data synchronization tool designed for the Scroll Layer 2 network. Efficiently indexes blocks, transactions, and events from the Scroll chain, providing fast access to historical data for applications and analytics.",
            techStack: ["Node.js", "PostgreSQL", "Web3.js", "Redis"],
            features: [
                "Real-time block synchronization",
                "Event indexing and filtering",
                "Historical data access",
                "Optimized database queries",
                "Caching for performance",
                "RESTful API endpoints"
            ],
            highlights: ["Scroll L2", "Data Indexing", "Real-time Sync"],
            githubRepo: "muhammadaus/ScrollSync",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "dex-slippage",
            title: "DEX Slippage Analysis",
            category: ["defi", "analytics"],
            description: "Analytics tool for analyzing slippage patterns across decentralized exchanges",
            longDescription: "A data analytics tool that tracks and analyzes slippage patterns across multiple DEXs. Helps traders and liquidity providers understand market impact, optimize trade execution, and identify the most efficient trading routes. Provides real-time and historical slippage data visualization.",
            techStack: ["Python", "Web3.py", "Pandas", "Matplotlib", "SQL"],
            features: [
                "Multi-DEX slippage tracking",
                "Real-time slippage monitoring",
                "Historical pattern analysis",
                "Trade route optimization",
                "Data visualization dashboards",
                "Price impact calculations"
            ],
            highlights: ["DEX Analytics", "Slippage Tracking", "Data Viz"],
            githubRepo: "muhammadaus/DEX-Slippage-Analysis",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "clear-signing-builder",
            title: "Clear Signing ERC7730 Builder",
            category: ["blockchain", "devtools"],
            description: "Interactive builder tool for creating ERC-7730 clear signing descriptors",
            longDescription: "A visual builder and development tool for creating ERC-7730 descriptor files. Provides an intuitive interface for defining clear signing schemas, validates descriptor syntax, and generates production-ready configurations for smart contract interactions.",
            techStack: ["React", "TypeScript", "Monaco Editor", "JSON Schema"],
            features: [
                "Visual descriptor builder",
                "Real-time validation",
                "Syntax highlighting",
                "Schema generation",
                "Export and import functionality",
                "Integration testing tools"
            ],
            highlights: ["ERC-7730 Builder", "Developer Tools", "Visual Editor"],
            githubRepo: "muhammadaus/clear-signing-erc7730-builder",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "v1-core",
            title: "V1 Core Protocol",
            category: ["defi", "blockchain"],
            description: "Core DeFi protocol with liquidity pools and yield farming mechanisms",
            longDescription: "A foundational DeFi protocol implementing core primitives like liquidity pools, yield farming, and token staking. Features gas-optimized smart contracts, secure vault mechanics, and composable interfaces for integration with other DeFi protocols.",
            techStack: ["Solidity", "Hardhat", "OpenZeppelin", "Chainlink"],
            features: [
                "Liquidity pool implementation",
                "Yield farming contracts",
                "Token staking mechanisms",
                "Reward distribution system",
                "Gas-optimized operations",
                "Oracle price feeds integration"
            ],
            highlights: ["DeFi Protocol", "Yield Farming", "Gas Optimized"],
            githubRepo: "muhammadaus/v1-core",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "mean-optimizoor",
            title: "Mean Optimizoor",
            category: ["defi"],
            description: "DeFi yield optimizer that automatically compounds and reallocates funds for maximum returns",
            longDescription: "An automated yield optimization protocol that maximizes returns by intelligently allocating funds across multiple DeFi protocols. Implements advanced strategies for auto-compounding rewards, gas-efficient rebalancing, and risk-adjusted portfolio management.",
            techStack: ["Solidity", "JavaScript", "Web3.js", "The Graph"],
            features: [
                "Automated yield farming",
                "Auto-compounding strategies",
                "Multi-protocol integration",
                "Gas-efficient rebalancing",
                "Risk assessment algorithms",
                "Performance analytics dashboard"
            ],
            highlights: ["Yield Optimizer", "Auto-compound", "Multi-protocol"],
            githubRepo: "muhammadaus/Mean-Optimizoor",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },

        // Full-Stack Projects
        {
            id: "autonomous-coding",
            title: "Autonomous Coding Agent",
            category: ["ai", "fullstack"],
            description: "AI-powered coding assistant that writes, reviews, and refactors code autonomously",
            longDescription: "An autonomous AI agent that assists with software development tasks including code generation, review, refactoring, and documentation. Uses large language models to understand context and generate high-quality code following best practices and project conventions.",
            techStack: ["Python", "OpenAI API", "FastAPI", "React", "TypeScript"],
            features: [
                "Autonomous code generation",
                "Code review and suggestions",
                "Automated refactoring",
                "Documentation generation",
                "Test case creation",
                "Multi-language support"
            ],
            highlights: ["AI Coding", "LLM Integration", "Automation"],
            githubRepo: "muhammadaus/Autonomous-coding",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "in-progress",
            year: 2025
        },
        {
            id: "email-replier",
            title: "AI Email Replier",
            category: ["ai", "fullstack"],
            description: "Intelligent email automation system that drafts contextual replies using AI",
            longDescription: "An AI-powered email management system that analyzes incoming emails and generates contextual, personalized replies. Features sentiment analysis, priority classification, and automated response drafting while maintaining user voice and style.",
            techStack: ["Python", "OpenAI API", "IMAP", "SMTP", "React"],
            features: [
                "AI-powered reply generation",
                "Sentiment analysis",
                "Priority classification",
                "Style matching",
                "Multi-account support",
                "Draft review interface"
            ],
            highlights: ["AI Email", "Auto-reply", "Context-aware"],
            githubRepo: "muhammadaus/Email-replier",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "tldr",
            title: "TLDR Summarizer",
            category: ["ai", "fullstack"],
            description: "AI-powered content summarization tool for articles, documents, and web pages",
            longDescription: "A comprehensive content summarization platform that uses advanced NLP to extract key insights from long-form content. Supports multiple content types including articles, PDFs, and web pages, providing concise summaries with adjustable detail levels.",
            techStack: ["Python", "Next.js", "TypeScript", "FastAPI", "Transformers"],
            features: [
                "Multi-format content support",
                "Adjustable summary length",
                "Key points extraction",
                "Multi-language support",
                "Browser extension integration",
                "API for developers"
            ],
            highlights: ["AI Summarization", "Multi-format", "NLP"],
            githubRepo: "muhammadaus/TLDR",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "customplaylistmaker",
            title: "Custom Playlist Maker",
            category: ["fullstack"],
            description: "Music playlist generator with AI-powered recommendations and mood-based curation",
            longDescription: "A smart playlist creation tool that generates customized music playlists based on mood, activity, and user preferences. Integrates with Spotify API and uses machine learning to understand music taste and create perfectly curated playlists.",
            techStack: ["React", "Node.js", "Express", "Spotify API", "MongoDB"],
            features: [
                "Spotify integration",
                "Mood-based playlist generation",
                "AI-powered recommendations",
                "Activity-based curation",
                "Playlist sharing",
                "User preference learning"
            ],
            highlights: ["Spotify API", "AI Recommendations", "Music Curation"],
            githubRepo: "muhammadaus/customplaylistmaker",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },

        // Developer Tools
        {
            id: "splitkeyboard",
            title: "Split Keyboard Config",
            category: ["devtools"],
            description: "Configuration and layout optimizer for split ergonomic keyboards",
            longDescription: "A comprehensive configuration tool for split ergonomic keyboards, featuring custom layout design, key mapping, and macro programming. Includes firmware configurations, layer customization, and ergonomic optimization guides for popular split keyboard models.",
            techStack: ["QMK Firmware", "C", "Python", "Web UI"],
            features: [
                "Custom layout designer",
                "Key mapping interface",
                "Macro programming",
                "Layer configuration",
                "Firmware compilation",
                "Ergonomic recommendations"
            ],
            highlights: ["Ergonomic", "QMK Firmware", "Custom Layouts"],
            githubRepo: "muhammadaus/SplitKeyboard",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "vimgame",
            title: "VimGame",
            category: ["devtools"],
            description: "Interactive game for learning and mastering Vim keyboard shortcuts",
            longDescription: "A gamified learning platform for mastering Vim text editor commands and workflows. Features progressive difficulty levels, interactive challenges, and real-time feedback to help developers build muscle memory for efficient text editing.",
            techStack: ["JavaScript", "React", "CSS"],
            features: [
                "Progressive difficulty levels",
                "Interactive Vim challenges",
                "Real-time feedback",
                "Achievement system",
                "Leaderboards",
                "Custom challenge creator"
            ],
            highlights: ["Vim Learning", "Interactive", "Gamification"],
            githubRepo: "muhammadaus/VimGame",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "tmux-panorama",
            title: "Tmux Panorama",
            category: ["devtools"],
            description: "Advanced tmux theme with enhanced status bar and productivity features",
            longDescription: "A highly customizable tmux theme focused on developer productivity. Features an information-rich status bar, workspace management, session persistence, and integrations with common development tools for an optimized terminal multiplexer experience.",
            techStack: ["Shell Script", "Tmux", "Lua"],
            features: [
                "Custom status bar design",
                "Workspace management",
                "Session persistence",
                "Git integration",
                "System resource monitoring",
                "Plugin architecture"
            ],
            highlights: ["Tmux Theme", "Productivity", "Developer Tools"],
            githubRepo: "muhammadaus/tmux-panorama",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },

        // AI/LLM Projects
        {
            id: "rag-llm",
            title: "RAG-LLM System",
            category: ["ai"],
            description: "Retrieval Augmented Generation system for context-aware AI responses",
            longDescription: "A sophisticated RAG (Retrieval Augmented Generation) system that enhances LLM responses with relevant context from document databases. Implements vector search, semantic chunking, and intelligent retrieval strategies to provide accurate, context-aware AI responses grounded in specific knowledge bases.",
            techStack: ["Python", "LangChain", "OpenAI API", "Pinecone", "FastAPI"],
            features: [
                "Vector database integration",
                "Semantic document chunking",
                "Intelligent retrieval strategies",
                "Context-aware generation",
                "Multi-document support",
                "Citation tracking"
            ],
            highlights: ["RAG", "Vector Search", "Context-aware AI"],
            githubRepo: "muhammadaus/RAG-LLM",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        },
        {
            id: "agentkit",
            title: "AgentKit Framework",
            category: ["ai"],
            description: "Framework for building autonomous AI agents with tool use and memory",
            longDescription: "A comprehensive framework for developing autonomous AI agents with tool use capabilities, persistent memory, and planning abilities. Provides abstractions for agent behavior, tool integration, and multi-agent coordination systems.",
            techStack: ["Python", "LangChain", "OpenAI API", "Redis"],
            features: [
                "Agent behavior abstractions",
                "Tool use framework",
                "Persistent memory system",
                "Planning and reasoning",
                "Multi-agent coordination",
                "Extensible plugin architecture"
            ],
            highlights: ["AI Agents", "Tool Use", "Framework"],
            githubRepo: "muhammadaus/agentkit",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "in-progress",
            year: 2025
        },
        {
            id: "node-deepresearch",
            title: "Node DeepResearch",
            category: ["ai", "fullstack"],
            description: "Automated research tool that uses AI to gather, analyze, and synthesize information",
            longDescription: "An AI-powered research automation platform that crawls web sources, extracts relevant information, and synthesizes comprehensive research reports. Features intelligent source evaluation, fact verification, and citation management for academic and professional research.",
            techStack: ["Node.js", "Puppeteer", "OpenAI API", "PostgreSQL", "React"],
            features: [
                "Automated web crawling",
                "AI-powered information extraction",
                "Source credibility scoring",
                "Fact verification",
                "Research synthesis",
                "Citation management"
            ],
            highlights: ["AI Research", "Web Crawling", "Auto-synthesis"],
            githubRepo: "muhammadaus/node-DeepResearch",
            liveUrl: null,
            demoUrl: null,
            image: "./img/projects/default.png",
            status: "completed",
            year: 2024
        }
    ]
};

// Export for use in portfolio
if (typeof window !== 'undefined') {
    window.projectsData = projectsData;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}
