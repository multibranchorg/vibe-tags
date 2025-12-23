#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const scanRoot = process.cwd();
const patterns = [
  /\b\d{3}-\d{2}-\d{4}\b/g,
  /\b\d{16}\b/g,
  /@/g
];

let hits = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  patterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      hits += matches.length;
    }
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === 'dist') continue;
      walk(fullPath);
    } else if (stat.isFile()) {
      scanFile(fullPath);
    }
  }
}

walk(scanRoot);

if (hits > 0) {
  console.error(`PII scan flagged ${hits} potential findings. Escalate to privacy review.`);
  process.exit(2);
}

console.log('PII scan passed. No obvious findings.');
