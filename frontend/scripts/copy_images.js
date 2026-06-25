const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\clt\\.gemini\\antigravity-ide\\brain\\c5441f3a-0b54-46ed-9263-ac1101bee07d';
const destDir = 'd:\\PROJET LOGICIEL\\Julia 2.0\\frontend\\public\\images\\job_training';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = {
  'crafts_trades_1782382925846.png': 'crafts_trades.png',
  'metalworking_1782382937891.png': 'metalworking.png',
  'electrical_1782382949015.png': 'electrical.png',
  'civil_engineering_1782382960080.png': 'civil_engineering.png',
  'retail_1782382972179.png': 'retail.png',
  'hospitality_1782382983850.png': 'hospitality.png',
  'healthcare_1782382999814.png': 'healthcare.png',
  'professional_driver_1782383009951.png': 'professional_driver.png',
  'commercial_business_1782383020058.png': 'commercial_business.png',
  'warehouse_logistics_1782383031139.png': 'warehouse_logistics.png'
};

for (const [src, dest] of Object.entries(files)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.error(`File not found: ${srcPath}`);
  }
}
