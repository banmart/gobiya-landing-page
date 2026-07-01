const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '..', 'src'));
console.log(`Scanning and repairing ${files.length} files...`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('\uFFFD') || content.includes('\u00ef\u00bf\u00bd')) {
    console.log(`Repairing file: ${file}`);
    
    // Replace apostrophe contractions first
    content = content.replace(/we\uFFFDll/g, "we'll");
    content = content.replace(/we\uFFFDve/g, "we've");
    content = content.replace(/we\uFFFDd/g, "we'd");
    content = content.replace(/you\uFFFDll/g, "you'll");
    content = content.replace(/you\uFFFDre/g, "you're");
    content = content.replace(/you\uFFFDve/g, "you've");
    content = content.replace(/you\uFFFDd/g, "you'd");
    content = content.replace(/don\uFFFDt/g, "don't");
    content = content.replace(/it\uFFFDs/g, "it's");
    content = content.replace(/that\uFFFDs/g, "that's");
    content = content.replace(/here\uFFFDs/g, "here's");
    content = content.replace(/let\uFFFDs/g, "let's");
    content = content.replace(/doesn\uFFFDt/g, "doesn't");
    content = content.replace(/won\uFFFDt/g, "won't");
    content = content.replace(/can\uFFFDt/g, "can't");
    content = content.replace(/didn\uFFFDt/g, "didn't");
    content = content.replace(/aren\uFFFDt/g, "aren't");
    content = content.replace(/wasn\uFFFDt/g, "wasn't");
    content = content.replace(/weren\uFFFDt/g, "weren't");
    content = content.replace(/client\uFFFDs/g, "client's");
    content = content.replace(/competitor\uFFFDs/g, "competitor's");
    content = content.replace(/Google\uFFFDs/g, "Google's");
    content = content.replace(/site\uFFFDs/g, "site's");
    content = content.replace(/remodeling\uFFFDs/g, "remodeling's");
    content = content.replace(/buyer\uFFFDs/g, "buyer's");
    content = content.replace(/buyers\uFFFD/g, "buyers'");
    content = content.replace(/I\uFFFDm/g, "I'm");
    content = content.replace(/we\u00ef\u00bf\u00bdll/g, "we'll");
    content = content.replace(/we\u00ef\u00bf\u00bdve/g, "we've");
    content = content.replace(/we\u00ef\u00bf\u00bdd/g, "we'd");
    content = content.replace(/you\u00ef\u00bf\u00bdll/g, "you'll");
    content = content.replace(/you\u00ef\u00bf\u00bdre/g, "you're");
    content = content.replace(/you\u00ef\u00bf\u00bdve/g, "you've");
    content = content.replace(/you\u00ef\u00bf\u00bdd/g, "you'd");
    content = content.replace(/don\u00ef\u00bf\u00bdt/g, "don't");
    content = content.replace(/it\u00ef\u00bf\u00bds/g, "it's");
    content = content.replace(/that\u00ef\u00bf\u00bds/g, "that's");
    content = content.replace(/here\u00ef\u00bf\u00bds/g, "here's");
    content = content.replace(/let\u00ef\u00bf\u00bds/g, "let's");
    content = content.replace(/doesn\u00ef\u00bf\u00bdt/g, "doesn't");
    content = content.replace(/won\u00ef\u00bf\u00bdt/g, "won't");
    content = content.replace(/can\u00ef\u00bf\u00bdt/g, "can't");
    content = content.replace(/didn\u00ef\u00bf\u00bdt/g, "didn't");
    content = content.replace(/aren\u00ef\u00bf\u00bdt/g, "aren't");
    content = content.replace(/wasn\u00ef\u00bf\u00bdt/g, "wasn't");
    content = content.replace(/weren\u00ef\u00bf\u00bdt/g, "weren't");
    content = content.replace(/client\u00ef\u00bf\u00bds/g, "client's");
    content = content.replace(/competitor\u00ef\u00bf\u00bds/g, "competitor's");
    content = content.replace(/Google\u00ef\u00bf\u00bds/g, "Google's");
    content = content.replace(/site\u00ef\u00bf\u00bds/g, "site's");
    content = content.replace(/remodeling\u00ef\u00bf\u00bds/g, "remodeling's");
    content = content.replace(/buyer\u00ef\u00bf\u00bds/g, "buyer's");
    content = content.replace(/buyers\u00ef\u00bf\u00bd/g, "buyers'");
    content = content.replace(/I\u00ef\u00bf\u00bdm/g, "I'm");

    // Replace range dashes: number-number (e.g. 2030)
    content = content.replace(/(\d)\uFFFD(\d)/g, '$1–$2');
    content = content.replace(/(\d)\u00ef\u00bf\u00bd(\d)/g, '$1–$2');

    // Replace other replacements with en/em dashes depending on space
    // Let's replace '  ' or '' with a clean em dash ' — '
    content = content.replace(/ \uFFFD /g, ' — ');
    content = content.replace(/ \u00ef\u00bf\u00bd /g, ' — ');
    
    // Remaining lone replacement characters
    content = content.replace(/\uFFFD/g, '—');
    content = content.replace(/\u00ef\u00bf\u00bd/g, '—');

    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Repair complete.");
