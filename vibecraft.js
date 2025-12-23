#!/usr/bin/env node
/**
 * 🌈 VibeCraft.js 🌈
 * The AI-Powered Web Framework for the Terminally Lazy
 * 
 * "Why write HTML when you can vibe?"
 * 
 * Usage: node vibecraft.js <input.vcx> [output.html]
 */

const fs = require('fs');
const https = require('https');

// Parse command line args
const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile?.replace(/\.vcx$/, '.html') || 'output.html';

if (!inputFile) {
  console.log(`
  🌈 VibeCraft.js - The AI Web Framework 🌈
  
  Usage: node vibecraft.js <input.vcx> [output.html]
  
  Create a .vcx file with <AI prompt="..."/> tags and watch the magic happen!
  
  Example input.vcx:
    <html>
      <body>
        <h1>My AI-Powered Page</h1>
        <AI prompt="Write a haiku about JavaScript in an h2 tag"/>
        <AI prompt="Generate a fun 3-item unordered list about cats"/>
      </body>
    </html>
  `);
  process.exit(0);
}

// The sacred regex that finds AI tags
const AI_TAG_REGEX = /<AI\s+prompt="([^"]+)"\s*\/>/g;

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return `<div style="color:red">🚨 ERROR: OPENAI_API_KEY not set! The vibes are broken! 🚨</div>`;
  }

  const requestBody = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an HTML generator for VibeCraft.js, the funniest web framework ever.
Return ONLY valid HTML that will be inserted directly into the page. No markdown, no code fences.
Be creative, fun, and slightly unhinged. Add inline styles for extra pizzazz.
Keep responses concise but entertaining.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 500,
    temperature: 0.9
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            resolve(`<div style="color:orange">🤖 AI Error: ${json.error.message}</div>`);
          } else {
            resolve(json.choices[0].message.content);
          }
        } catch (e) {
          resolve(`<div style="color:red">🔥 Parse Error: ${e.message}</div>`);
        }
      });
    });

    req.on('error', (e) => {
      resolve(`<div style="color:red">🌐 Network Error: ${e.message}</div>`);
    });

    req.write(requestBody);
    req.end();
  });
}

async function processVCX(content) {
  // Find all matches first
  const matches = [];
  let match;
  const regex = /<AI\s+prompt="([^"]+)"\s*\/>/g;
  while ((match = regex.exec(content)) !== null) {
    matches.push({ fullMatch: match[0], prompt: match[1], index: match.index });
  }
  
  if (matches.length === 0) {
    console.log('⚠️  No <AI/> tags found. Is this even VibeCraft? 🤔');
    return content;
  }

  console.log(`🔮 Found ${matches.length} AI tag(s) to process...\n`);
  
  // Process all AI calls
  const replacements = [];
  for (let i = 0; i < matches.length; i++) {
    const { fullMatch, prompt } = matches[i];
    console.log(`✨ [${i + 1}/${matches.length}] Vibing: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"\n`);
    
    const aiResponse = await callOpenAI(prompt);
    replacements.push({
      fullMatch,
      replacement: `<!-- VibeCraft: ${prompt.substring(0, 30)}... -->\n${aiResponse}\n<!-- /VibeCraft -->`
    });
  }
  
  // Apply all replacements
  let result = content;
  for (const { fullMatch, replacement } of replacements) {
    result = result.replace(fullMatch, replacement);
  }
  
  return result;
}

async function main() {
  console.log(`
  🌈✨ VibeCraft.js v0.420.69 ✨🌈
  "Artisanal HTML, crafted by robots"
  ──────────────────────────────────
  `);

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}\n   Did it achieve enlightenment and transcend?`);
    process.exit(1);
  }

  const content = fs.readFileSync(inputFile, 'utf-8');
  console.log(`📖 Reading: ${inputFile}`);
  
  const processed = await processVCX(content);
  
  fs.writeFileSync(outputFile, processed);
  console.log(`\n🎉 Output written to: ${outputFile}`);
  console.log(`🚀 Open it in your browser and witness the chaos!\n`);
}

main().catch(console.error);
