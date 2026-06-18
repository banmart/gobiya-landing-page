import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let updatedCount = 0;

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // We want to replace:
  // btnEl.addEventListener('mousemove', (e) => {
  //   const r = btnEl.getBoundingClientRect();
  // With caching logic.
  
  // Since formats vary slightly, let's use a simpler replace strategy
  const regex1 = /(const handleMouseMove = \(e: Event\) => {\s+const mouseEvent = e as MouseEvent;\s+)const r = (btn[a-zA-Z0-9_]*)\.getBoundingClientRect\(\);/g;
  
  const regex2 = /(btn[a-zA-Z0-9_]*\.addEventListener\('mousemove',\s*\(e\) => {\s+)const r = (btn[a-zA-Z0-9_]*)\.getBoundingClientRect\(\);/g;

  let newContent = content.replace(regex1, (match, prefix, btnVar) => {
    return prefix + `const r = (${btnVar} as any)._cachedRect || ${btnVar}.getBoundingClientRect();`;
  });

  newContent = newContent.replace(regex2, (match, prefix, btnVar) => {
    return prefix + `const r = (${btnVar} as any)._cachedRect || ${btnVar}.getBoundingClientRect();`;
  });

  // Now we need to inject the mouseenter listener where the strength is defined
  // Actually, we can just add a mouseenter listener where mouseleave is defined, 
  // or just right before the mousemove.
  const regex3 = /const strength = 10;/g;
  newContent = newContent.replace(regex3, `const strength = 10;\n          btn.addEventListener('mouseenter', () => { (btn as any)._cachedRect = btn.getBoundingClientRect(); });`);

  if (content !== newContent) {
    fs.writeFileSync(p, newContent);
    console.log('Updated ' + file);
    updatedCount++;
  }
}

console.log('Total updated files: ' + updatedCount);
