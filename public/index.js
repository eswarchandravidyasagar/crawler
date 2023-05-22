

const linkList = document.getElementById('linkList');
const crawlButton = document.getElementById('crawlButton');

crawlButton.addEventListener('click', () => {
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value;

  fetch(`/crawl?url=${encodeURIComponent(url)}`) // Assuming your server's API endpoint is '/crawl' and passing the 'url' query parameter
    .then(response => response.json())
    
    .then(links => {
      links.forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = link;
        listItem.appendChild(linkElement);
        linkList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching links:', error);
    });
});
