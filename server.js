const express = require('express');
const app = express();
require('dotenv').config();
// const fetch = require('node-fetch');
const cors = require('cors');
const apiKey = process.env.COINGECKO_API_KEY;

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-cg-demo-api-key': apiKey },
};

app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello world');
// });
app.get('/hello', (req, res) => {
  res.send('Hello world');
});

app.get('/api/coins/market_chart/:coin', async (req, res) => {
  console.log(apiKey);
  const fetch = (await import('node-fetch')).default;
  const coin = req.params.coin;
  const days = req.query.days;
  console.log('the coin is', coin);
  const query = new URLSearchParams(req.query).toString();
  //   console.log('The query is ', query);
  console.log('the day is', req.query.days);
  console.log('the currency is', req.query.currency);
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`,
      options
    );
    res.json(await response.json());
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the public API' });
  }
});
app.get('/api/coins', async (req, res) => {
  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
      options
    );
    res.json(await response.json());
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the public API' });
  }
});
app.get('/api/coins/:coin', async (req, res) => {
  const fetch = (await import('node-fetch')).default;
  const coin = req.params.coin;
  console.log('COin page has hit this and the coin is >>>', coin);

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}`,
      options
    );
    res.json(await response.json());
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from the public API' });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on the port ${process.env.PORT}`);
});
