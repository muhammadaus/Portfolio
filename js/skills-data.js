/**
 * Skills Data Configuration
 * All technical skills with proficiency levels and project associations
 */

const skillsData = {
    // Blockchain & Web3
    "Solidity": {
        category: "Blockchain & Web3",
        proficiency: 95,
        projects: ["rent2own", "shadowswap", "kai-sign", "erc7730", "v1-core", "clear-signing-builder"],
        icon: "fab fa-ethereum",
        description: "Smart contract development and DeFi protocols"
    },
    "Web3.js": {
        category: "Blockchain & Web3",
        proficiency: 90,
        projects: ["rent2own", "shadowswap", "prvt", "kai-sign", "scrollsync"],
        icon: "fas fa-cube",
        description: "Ethereum blockchain interaction and dApp development"
    },
    "DeFi Protocols": {
        category: "Blockchain & Web3",
        proficiency: 88,
        projects: ["rent2own", "shadowswap", "v1-core", "mean-optimizoor", "dex-slippage"],
        icon: "fas fa-coins",
        description: "Decentralized finance protocol design and implementation"
    },

    // Frontend Development
    "React": {
        category: "Frontend Development",
        proficiency: 92,
        projects: ["cipherlogicxyz", "prvt", "kai-sign", "rent2own", "shadowswap", "customplaylistmaker", "autonomous-coding"],
        icon: "fab fa-react",
        description: "Modern React development with hooks and context"
    },
    "Next.js": {
        category: "Frontend Development",
        proficiency: 92,
        projects: ["cipherlogicxyz", "rent2own", "tldr"],
        icon: "fas fa-n",
        description: "Server-side rendering and static site generation"
    },
    "TypeScript": {
        category: "Frontend Development",
        proficiency: 90,
        projects: ["prvt", "kai-sign", "shadowswap", "clear-signing-builder", "autonomous-coding", "tldr"],
        icon: "fab fa-js-square",
        description: "Type-safe JavaScript development"
    },
    "Modern CSS": {
        category: "Frontend Development",
        proficiency: 85,
        projects: ["cipherlogicxyz", "prvt", "vimgame"],
        icon: "fab fa-css3-alt",
        description: "CSS Grid, Flexbox, and modern styling techniques"
    },

    // Backend & Data
    "Node.js": {
        category: "Backend & Data",
        proficiency: 88,
        projects: ["jobsearchagent", "prvt", "email-replier", "customplaylistmaker", "node-deepresearch", "scrollsync"],
        icon: "fab fa-node-js",
        description: "Server-side JavaScript and API development"
    },
    "Python": {
        category: "Backend & Data",
        proficiency: 85,
        projects: ["analytics-suite", "dex-slippage", "autonomous-coding", "email-replier", "rag-llm", "agentkit"],
        icon: "fab fa-python",
        description: "Data analysis, automation, and AI development"
    },
    "SQL & Analytics": {
        category: "Backend & Data",
        proficiency: 82,
        projects: ["analytics-suite", "dex-slippage"],
        icon: "fas fa-database",
        description: "Database design and data analytics"
    },
    "FastAPI": {
        category: "Backend & Data",
        proficiency: 82,
        projects: ["autonomous-coding", "tldr", "rag-llm"],
        icon: "fas fa-bolt",
        description: "High-performance Python web framework"
    },

    // AI & Machine Learning
    "LLMs & AI": {
        category: "AI & Machine Learning",
        proficiency: 85,
        projects: ["jobsearchagent", "autonomous-coding", "email-replier", "tldr", "rag-llm", "agentkit", "node-deepresearch"],
        icon: "fas fa-brain",
        description: "Large language models and AI integration"
    },
    "LangChain": {
        category: "AI & Machine Learning",
        proficiency: 80,
        projects: ["rag-llm", "agentkit", "node-deepresearch"],
        icon: "fas fa-link",
        description: "LLM application framework and agent development"
    },

    // Tools & Systems
    "Git": {
        category: "Tools & Systems",
        proficiency: 90,
        projects: ["all"],
        icon: "fab fa-git-alt",
        description: "Version control and collaborative development"
    },
    "Docker": {
        category: "Tools & Systems",
        proficiency: 85,
        projects: ["prvt", "scrollsync"],
        icon: "fab fa-docker",
        description: "Containerization and deployment"
    },
    "Embedded Systems": {
        category: "Tools & Systems",
        proficiency: 80,
        projects: [],
        icon: "fas fa-microchip",
        description: "Firmware development and hardware integration"
    },
    "Data Visualization": {
        category: "Tools & Systems",
        proficiency: 85,
        projects: ["analytics-suite", "dex-slippage"],
        icon: "fas fa-chart-line",
        description: "Tableau, D3.js, and visualization libraries"
    },

    // Specialized Skills
    "Puppeteer": {
        category: "Automation",
        proficiency: 88,
        projects: ["jobsearchagent", "node-deepresearch"],
        icon: "fas fa-robot",
        description: "Browser automation and web scraping"
    },
    "PostgreSQL": {
        category: "Backend & Data",
        proficiency: 80,
        projects: ["prvt", "scrollsync", "node-deepresearch"],
        icon: "fas fa-database",
        description: "Relational database design and optimization"
    },
    "GraphQL": {
        category: "Backend & Data",
        proficiency: 78,
        projects: ["shadowswap"],
        icon: "fas fa-project-diagram",
        description: "API design and implementation"
    }
};

// Certifications and achievements
const certificationsData = [
    {
        id: "google-analytics",
        title: "Google Advanced Data Analytics Professional Certificate",
        issuer: "Google",
        date: "2023",
        icon: "fab fa-google",
        url: null,
        description: "Advanced data analytics, statistics, and visualization"
    },
    {
        id: "eth-tokyo",
        title: "ETH Tokyo 2024 Hackathon Winner",
        issuer: "ETH Tokyo",
        date: "2024",
        icon: "fas fa-award",
        url: null,
        description: "First place for ShadowSwap AMM implementation"
    },
    {
        id: "jlpt-n1",
        title: "JLPT N1 - Japanese Language Proficiency",
        issuer: "JLPT",
        date: "2023",
        icon: "fas fa-language",
        url: null,
        description: "Highest level Japanese language certification"
    }
];

// Calculate project counts for each skill
function calculateSkillProjectCounts() {
    const counts = {};

    for (const [skillName, skillData] of Object.entries(skillsData)) {
        if (skillData.projects.includes("all")) {
            // For skills like Git that are used in all projects
            counts[skillName] = "20+";
        } else {
            counts[skillName] = skillData.projects.length;
        }
    }

    return counts;
}

// Get skills by category
function getSkillsByCategory(category) {
    return Object.entries(skillsData)
        .filter(([_, data]) => data.category === category)
        .reduce((acc, [name, data]) => {
            acc[name] = data;
            return acc;
        }, {});
}

// Get all categories
function getSkillCategories() {
    const categories = new Set();
    Object.values(skillsData).forEach(skill => {
        categories.add(skill.category);
    });
    return Array.from(categories);
}

// Export for use in portfolio
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        skillsData,
        certificationsData,
        calculateSkillProjectCounts,
        getSkillsByCategory,
        getSkillCategories
    };
}
