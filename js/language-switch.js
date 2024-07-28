function toggleLanguage(lang) {
    if (lang === 'ja') {
        window.location.href = 'index_ja.html';
    } else if (lang === 'en') {
        window.location.href = 'index.html';
    }
}

// Function to set the initial language based on user's preference or browser settings
function setInitialLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('ja') && !window.location.href.includes('index_ja.html')) {
        window.location.href = 'index_ja.html';
    }
}

// Call setInitialLanguage when the page loads
window.onload = setInitialLanguage;