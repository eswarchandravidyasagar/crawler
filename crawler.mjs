import axios from 'axios';
import cheerio from 'cheerio';

async function crawl(url) {
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = [];

    // $('a').each((index, element) => {
    //   const link = $(element).attr('href');
    //   if (link && link.startsWith('http')) {
    //     links.push(link);


    //   }

    //   if (link && link.startsWith('/')) {
    //     links.push(`${url}${link}`);


    // });
    $('a').each(async (index, element) => {
      const link = $(element).attr('href');
      if (link && link.startsWith('http')) {
        try {
          const linkResponse = await axios.get(link);
          const linkContent = linkResponse.data;
          const chunks = linkContent.match(/.{1,50}/g); // Split content into chunks of 100 characters
          const charCount = chunks.map(chunk => chunk.length); // Get character count for each chunk
          const totalCharCount = charCount.reduce((acc, curr) => acc + curr, 0); // Get total character count
          links.push({ url: link, charCount: totalCharCount });
        } catch (error) {
          console.error(`Error crawling ${link}: ${error.message}`);
        }
      }
    });

    return links;
  } catch (error) {
    console.error(`Error crawling ${url}: ${error.message}`);
    return [];
  }
}

export default crawl;
