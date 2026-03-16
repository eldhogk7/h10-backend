const fs = require('fs');

// Read the UTF-16LE file and convert to string
const content = fs.readFileSync('structure.sql', 'utf16le');

// Remove the problematic default value that Prisma generated
const cleaned = content.replace(/DEFAULT\s+generate_exr_id\(\)/g, '');

fs.writeFileSync('cleaned_structure.sql', cleaned, 'utf8');
console.log('Cleaned SQL generated.');
