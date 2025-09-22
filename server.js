const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express();

const PORT = process.env.PORT || 3000;

// Прокси для ресурсов
app.get('/resource', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const contentType = response.headers.get('content-type');
    if (contentType) res.set('Content-Type', contentType);
    response.body.pipe(res);
  } catch (err) {
    res.status(502).send('Bad gateway');
  }
});

// Главная страница (тест)
app.get('/', (req, res) => {
  res.send('<h1>Прокси работает!</h1>');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
