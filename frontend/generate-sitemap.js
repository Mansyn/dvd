const SitemapGenerator = require('sitemap-generator');
const path = require('path');

// Create generator
const generator = SitemapGenerator('https://www.dvdbrew.com', {
  stripQuerystring: false,
  filepath: path.join(__dirname, 'dist', 'dvd-app/browser', 'sitemap.xml'),
  maxDepth: 0,
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap created!');
});

// Start the crawler
generator.start();
