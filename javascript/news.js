document.addEventListener("DOMContentLoaded", () => {
  const feeds = [
    {
      containerId: "feed-hackernews",
      rssUrl: "https://feeds.feedburner.com/TheHackersNews"
    },
    {
      containerId: "feed-bleepingcomputer",
      rssUrl: "https://www.bleepingcomputer.com/feed/"
    },
    {
      containerId: "feed-krebs",
      rssUrl: "https://krebsonsecurity.com/feed/"
    },
    {
      containerId: "feed-darkreading",
      rssUrl: "https://www.darkreading.com/rss.xml"
    }
  ];

  feeds.forEach((feed) => loadFeed(feed.containerId, feed.rssUrl));
});

async function loadFeed(containerId, rssUrl) {
  const container = document.querySelector(`#${containerId} .news-feed-list`);

  if (!container) return;

  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || !data.items.length) {
      container.innerHTML = "<li>No articles available right now.</li>";
      return;
    }

    const articles = data.items.slice(0, 5);

    container.innerHTML = articles
      .map(
        (article) => `
          <li>
            <a href="${article.link}" target="_blank" rel="noopener noreferrer">
              ${article.title}
            </a>
          </li>
        `
      )
      .join("");
  } catch (error) {
    container.innerHTML = "<li>Feed unavailable right now.</li>";
    console.error(`Error loading feed for ${containerId}:`, error);
  }
}