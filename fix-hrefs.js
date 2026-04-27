const fs = require("fs");
const path = require("path");

const BASE_DIR = "./public"; // adjust if needed

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Remove header/footer placeholder divs
  content = content.replace(/<div\s+id=["']header-placeholder["'][^>]*>\s*<\/div>/gi, "");
  content = content.replace(/<div\s+id=["']footer-placeholder["'][^>]*>\s*<\/div>/gi, "");

  // Remove JS fetch scripts for header and footer
  content = content.replace(
    /<script[^>]*>[\s\S]*?fetch\(['"]\/header\.html['"]\)[\s\S]*?getElementById\(['"]header-placeholder['"]\)[\s\S]*?<\/script>/gi,
    ""
  );

  content = content.replace(
    /<script[^>]*>[\s\S]*?fetch\(['"]\/footer\.html['"]\)[\s\S]*?getElementById\(['"]footer-placeholder['"]\)[\s\S]*?<\/script>/gi,
    ""
  );

  // Avoid duplicate includes
  if (!content.includes('{% include "header.njk" %}')) {
    content = `{% include "header.njk" %}\n\n` + content;
  }

  if (!content.includes('{% include "footer.njk" %}')) {
    content = content.trim() + `\n\n{% include "footer.njk" %}\n`;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Updated: ${filePath}`);
}

function walkDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDirectory(fullPath);
    } else if (file.endsWith(".html") || file.endsWith(".njk")) {
      updateFile(fullPath);
    }
  });
}

// Start the walk
walkDirectory(BASE_DIR);
