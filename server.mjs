import express from 'express';
import crawl from './crawler.mjs';

const app = express();
const port = 3000;



// app.get('/crawl', async (req, res) => {
//   const links = await crawl('https://www.wikipedia.org/mango');
//   res.json(links);
// });
app.get('/crawl', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL is missing' });
  }

  const links = await crawl(url);
  res.json(links);
});



app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
