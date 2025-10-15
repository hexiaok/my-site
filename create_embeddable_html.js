const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const htmlFilePath = path.join(buildDir, 'index.html');

if (!fs.existsSync(htmlFilePath)) {
  console.error('Error: build/index.html not found. Please run "npm run build" first.');
  process.exit(1);
}

let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Find CSS file and inline it
htmlContent = htmlContent.replace(/<link href="\.\/static\/css\/(main\..*\.css)" rel="stylesheet">/, (match, cssFileName) => {
  const cssFilePath = path.join(buildDir, 'static', 'css', cssFileName);
  if (fs.existsSync(cssFilePath)) {
    console.log(`Inlining CSS: ${cssFileName}`);
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    return `<style>${cssContent}</style>`;
  }
  console.warn(`Warning: CSS file not found: ${cssFilePath}`);
  return match; // Return original if not found
});

// Find JS files and inline them
htmlContent = htmlContent.replace(/<script defer="defer" src="\.\/static\/js\/(main\..*\.js)"><\/script>/, (match, mainJsFileName) => {
  const mainJsFilePath = path.join(buildDir, 'static', 'js', mainJsFileName);
  
  // Find the chunk file dynamically
  const files = fs.readdirSync(path.join(buildDir, 'static', 'js'));
  const chunkFileName = files.find(f => f.endsWith('.chunk.js') && f.startsWith('453')); // More specific chunk finding

  if (!chunkFileName) {
      console.warn('Warning: JS chunk file not found.');
      return match;
  }

  const chunkJsFilePath = path.join(buildDir, 'static', 'js', chunkFileName);

  if (fs.existsSync(mainJsFilePath) && fs.existsSync(chunkJsFilePath)) {
    console.log(`Inlining JS: ${chunkFileName}`);
    const chunkJsContent = fs.readFileSync(chunkJsFilePath, 'utf8');
    
    console.log(`Inlining JS: ${mainJsFileName}`);
    const mainJsContent = fs.readFileSync(mainJsFilePath, 'utf8');
    
    // The order is important: chunk first, then main.
    return `<script>${chunkJsContent}${mainJsContent}</script>`;
  }
  
  console.warn(`Warning: JS file not found. Main: ${mainJsFilePath}, Chunk: ${chunkJsFilePath}`);
  return match; // Return original if not found
});

// Remove other script tags that might be present (like for chunks)
htmlContent = htmlContent.replace(/<script defer="defer" src="\.\/static\/js\/(\d+\..*\.chunk\.js)"><\/script>/g, '');


const outputFilePath = path.join(__dirname, 'embedded_globe.html');
fs.writeFileSync(outputFilePath, htmlContent);

console.log(`\nSuccessfully created self-contained HTML file: ${outputFilePath}`);