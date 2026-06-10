const fetch = require('node-fetch');

async function testScrape() {
  const res = await fetch('http://localhost:3000/api/prospector/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      category: 'plumber',
      location: 'seattle',
      numResults: 2,
    })
  });
  
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

testScrape();
